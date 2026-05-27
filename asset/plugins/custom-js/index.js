// 自定义 JS 扩展入口：参考官方 baidu-tongji 插件，在 reader 运行时读取配置并动态加载脚本。
(function () {
  var pluginName = 'custom-js'
  var runtimeMarker = 'data-topwrite-custom-js-runtime'
  var runtimeStateKey = '__topwriteCustomJSRuntimeConfig'

  var configSchema = {
    type: 'object',
    properties: {
      tag: {
        title: 'JavaScript 标签',
        type: 'string',
        description: '例如 <script ...></script>，阅读器打开页面时动态加载',
      },
      code: {
        title: 'JavaScript 代码',
        type: 'string',
        description: '不含 script 标签的代码，阅读器打开页面时作为内联脚本执行',
      },
    },
    additionalProperties: false,
  }

  function normalizeConfig(config) {
    var source = config && typeof config === 'object' ? config : {}
    return {
      tag: String(source.tag || '').replace(/\r\n/g, '\n'),
      code: String(source.code || '').replace(/\r\n/g, '\n'),
    }
  }

  function readPayloadConfig() {
    var payloadNode = document.querySelector('script[type="application/payload+json"]')
    if (!payloadNode) {
      return {}
    }
    try {
      var payload = JSON.parse(payloadNode.textContent || '{}')
      var book = payload && payload.book
      var config = book && book.config
      var pluginsConfig = config && config.pluginsConfig
      return normalizeConfig(pluginsConfig && pluginsConfig[pluginName])
    } catch (error) {
      return {}
    }
  }

  function readTopWriteConfig() {
    var topwrite = window.TopWrite
    if (!topwrite || typeof topwrite.useBook !== 'function') {
      return readPayloadConfig()
    }
    try {
      var book = topwrite.useBook()
      var bookConfig = book && book.config
      if (bookConfig && typeof bookConfig.getPluginConfig === 'function') {
        var pluginConfig = bookConfig.getPluginConfig(pluginName, configSchema)
        return normalizeConfig({
          tag: pluginConfig && typeof pluginConfig.getValue === 'function' ? pluginConfig.getValue('tag') : '',
          code: pluginConfig && typeof pluginConfig.getValue === 'function' ? pluginConfig.getValue('code') : '',
        })
      }
    } catch (error) {
      return readPayloadConfig()
    }
    return readPayloadConfig()
  }

  function removeRuntimeScripts() {
    var nodes = document.querySelectorAll('script[' + runtimeMarker + '="true"]')
    for (var index = 0; index < nodes.length; index += 1) {
      if (nodes[index].parentNode) {
        nodes[index].parentNode.removeChild(nodes[index])
      }
    }
  }

  function appendScript(script) {
    script.setAttribute(runtimeMarker, 'true')
    var target = document.body || document.head || document.documentElement
    if (target) {
      target.appendChild(script)
    }
  }

  function createExecutableScriptFromTag(tag) {
    var template = document.createElement('template')
    template.innerHTML = String(tag || '').trim()
    var source = template.content && template.content.querySelector('script')
    var script = document.createElement('script')
    if (!source) {
      script.text = String(tag || '')
      return script
    }
    for (var index = 0; index < source.attributes.length; index += 1) {
      var attribute = source.attributes[index]
      script.setAttribute(attribute.name, attribute.value)
    }
    if (source.src && !source.hasAttribute('async') && !source.hasAttribute('defer')) {
      script.async = false
    }
    script.text = source.text || source.textContent || ''
    return script
  }

  function injectCustomJS(config) {
    var normalized = normalizeConfig(config)
    var configKey = JSON.stringify(normalized)
    if (window[runtimeStateKey] === configKey) {
      return
    }
    window[runtimeStateKey] = configKey
    removeRuntimeScripts()
    if (normalized.tag.trim()) {
      appendScript(createExecutableScriptFromTag(normalized.tag))
    }
    if (normalized.code.trim()) {
      var script = document.createElement('script')
      script.type = 'text/javascript'
      script.text = normalized.code
      appendScript(script)
    }
  }

  function activate(scope) {
    if (scope !== 'reader') {
      return
    }
    var config = readTopWriteConfig()
    var react = window.React
    if (react && typeof react.useEffect === 'function') {
      react.useEffect(function () {
        injectCustomJS(config)
      }, [config.tag, config.code])
      return
    }
    injectCustomJS(config)
  }

  var plugin = {
    name: pluginName,
    config: configSchema,
    activate: activate,
  }

  if (window.TopWrite && typeof window.TopWrite.Plugin === 'function') {
    plugin = new window.TopWrite.Plugin({
      name: pluginName,
      config: configSchema,
      activate: activate,
    })
  }

  window.TopWritePlugins = window.TopWritePlugins || {}
  window.TopWritePlugins[pluginName] = plugin
})()
