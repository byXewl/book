// giscus TopWrite 扩展入口：通过文章插槽挂载评论区，避免运行时猜测正文 DOM。
(function () {
  var TopWrite = window.TopWrite || {}
  var React = window.React || {}

  var configSchema = {
    type: 'object',
    properties: {
      repo: { type: 'string', title: 'GitHub 仓库' },
      repoId: { type: 'string', title: '仓库 ID' },
      category: { type: 'string', title: 'Discussion 分类', default: 'General' },
      categoryId: { type: 'string', title: '分类 ID' },
      mapping: { type: 'string', title: '页面匹配方式', default: 'page-path' },
      term: { type: 'string', title: '指定 term' },
      strict: { type: 'string', title: '严格匹配', default: '0' },
      reactionsEnabled: { type: 'string', title: '启用反应', default: '1' },
      emitMetadata: { type: 'string', title: '输出元数据', default: '0' },
      inputPosition: { type: 'string', title: '输入框位置', default: 'bottom' },
      theme: { type: 'string', title: '主题', default: 'light' },
      lang: { type: 'string', title: '语言', default: 'zh-CN' },
      loading: { type: 'string', title: '加载方式', default: 'lazy' },
      maxWidth: { type: 'integer', title: '评论区最大宽度', default: 827 },
    },
    additionalProperties: false,
    required: ['repo', 'repoId', 'categoryId'],
  }

  function normalizeConfig(source) {
    source = source || {}
    var mapping = String(source.mapping || 'page-path').trim()
    if (['page-path', 'pathname', 'url', 'title', 'og:title', 'specific'].indexOf(mapping) < 0) {
      mapping = 'page-path'
    }
    var reactionsEnabled = String(source.reactionsEnabled || source['reactions-enabled'] || '1').trim()
    var emitMetadata = String(source.emitMetadata || source['emit-metadata'] || '0').trim()
    var strict = String(source.strict || '0').trim()
    var inputPosition = String(source.inputPosition || source['input-position'] || 'bottom').trim()
    if (['top', 'bottom'].indexOf(inputPosition) < 0) {
      inputPosition = 'bottom'
    }
    var loading = String(source.loading || 'lazy').trim()
    if (['lazy', 'eager'].indexOf(loading) < 0) {
      loading = 'lazy'
    }
    var maxWidth = parseInt(source.maxWidth || source['max-width'] || '827', 10)
    if (!Number.isFinite(maxWidth) || maxWidth < 320) {
      maxWidth = 827
    }
    return {
      repo: String(source.repo || '').trim(),
      repoId: String(source.repoId || source['repo-id'] || '').trim(),
      category: String(source.category || 'General').trim() || 'General',
      categoryId: String(source.categoryId || source['category-id'] || '').trim(),
      mapping: mapping,
      term: String(source.term || '').trim(),
      strict: strict === '1' ? '1' : '0',
      reactionsEnabled: reactionsEnabled === '0' ? '0' : '1',
      emitMetadata: emitMetadata === '1' ? '1' : '0',
      inputPosition: inputPosition,
      theme: String(source.theme || 'light').trim() || 'light',
      lang: String(source.lang || 'zh-CN').trim() || 'zh-CN',
      loading: loading,
      maxWidth: maxWidth,
    }
  }

  function getPluginValues(book) {
    try {
      if (book && book.config && typeof book.config.getPluginConfig === 'function') {
        var pluginConfig = book.config.getPluginConfig('giscus', configSchema)
        if (pluginConfig && typeof pluginConfig.getValues === 'function') {
          return pluginConfig.getValues() || {}
        }
      }
    } catch (error) {
      window.console && console.warn && console.warn('[giscus] 读取插件配置失败', error)
    }
    return {}
  }

  function getPagePath(file) {
    var path = file && file.path ? String(file.path) : ''
    if (!path) {
      path = window.location.pathname.replace(/^\//, '')
    }
    path = path.replace(/[?#].*$/, '').replace(/\.html?$/i, '')
    return path || 'index'
  }

  function ensurePreconnect(origins) {
    origins.forEach(function (origin) {
      if (document.querySelector('link[rel="preconnect"][href="' + origin + '"]')) {
        return
      }
      var link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = origin
      link.crossOrigin = 'anonymous'
      document.head && document.head.appendChild(link)
    })
  }

  function createStatus(message) {
    var status = document.createElement('div')
    status.className = 'tw-giscus-comments-status'
    status.textContent = message
    status.style.minHeight = '42px'
    status.style.display = 'flex'
    status.style.alignItems = 'center'
    status.style.justifyContent = 'center'
    status.style.boxSizing = 'border-box'
    status.style.border = '1px solid #d8dee4'
    status.style.borderRadius = '6px'
    status.style.background = '#f6f8fa'
    status.style.color = '#57606a'
    status.style.fontSize = '14px'
    status.style.lineHeight = '1.6'
    status.style.padding = '10px 14px'
    return status
  }

  function updateStatus(section, message, failed) {
    var status = section.querySelector('.tw-giscus-comments-status')
    if (!status) {
      return
    }
    status.textContent = message
    if (failed) {
      status.style.borderColor = '#f2c6c6'
      status.style.background = '#fff6f6'
      status.style.color = '#b42318'
    }
  }

  function watchCommentFrame(section) {
    var status = section.querySelector('.tw-giscus-comments-status')
    var finished = false
    function markReady() {
      var frame = section.querySelector('iframe.giscus-frame, iframe')
      if (!frame || finished) {
        return false
      }
      finished = true
      if (status) {
        status.style.display = 'none'
      }
      return true
    }
    if (markReady()) {
      return function () {}
    }
    var observer = new MutationObserver(markReady)
    observer.observe(section, { childList: true, subtree: true })
    var slowTimer = window.setTimeout(function () {
      if (!finished) {
        updateStatus(section, '正在连接 GitHub 评论服务，网络较慢时可能需要稍等...', false)
      }
    }, 8000)
    var failTimer = window.setTimeout(function () {
      observer.disconnect()
      if (!finished) {
        updateStatus(section, '评论区暂时没有加载出来，请检查网络、GitHub 登录状态或 giscus 配置。', true)
      }
    }, 30000)
    return function () {
      observer.disconnect()
      window.clearTimeout(slowTimer)
      window.clearTimeout(failTimer)
    }
  }

  function isValidConfig(config) {
    return Boolean(
      config.repo &&
        config.repoId &&
        config.categoryId &&
        /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(config.repo)
    )
  }

  function mountGiscus(section, config, pagePath) {
    section.textContent = ''
    section.appendChild(createStatus('评论区加载中...'))

    var script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.async = true
    script.crossOrigin = 'anonymous'
    script.onerror = function () {
      updateStatus(section, 'giscus 评论脚本加载失败，请检查网络或浏览器拦截规则。', true)
    }
    script.setAttribute('data-repo', config.repo)
    script.setAttribute('data-repo-id', config.repoId)
    script.setAttribute('data-category', config.category)
    script.setAttribute('data-category-id', config.categoryId)
    if (config.mapping === 'page-path') {
      script.setAttribute('data-mapping', 'specific')
      script.setAttribute('data-term', pagePath)
    } else {
      script.setAttribute('data-mapping', config.mapping)
      if (config.mapping === 'specific' && config.term) {
        script.setAttribute('data-term', config.term)
      }
    }
    script.setAttribute('data-strict', config.strict)
    script.setAttribute('data-reactions-enabled', config.reactionsEnabled)
    script.setAttribute('data-emit-metadata', config.emitMetadata)
    script.setAttribute('data-input-position', config.inputPosition)
    script.setAttribute('data-theme', config.theme)
    script.setAttribute('data-lang', config.lang)
    script.setAttribute('data-loading', config.loading)
    section.appendChild(script)

    return watchCommentFrame(section)
  }

  function GiscusComments() {
    var ref = React.useRef(null)
    var book = TopWrite.useBook ? TopWrite.useBook() : null
    var file = TopWrite.useFile ? TopWrite.useFile() : null
    var config = normalizeConfig(getPluginValues(book))
    var pagePath = getPagePath(file)
    var configKey = JSON.stringify(config)

    React.useEffect(function () {
      var section = ref.current
      if (!section || !isValidConfig(config)) {
        return undefined
      }
      ensurePreconnect(['https://giscus.app', 'https://github.com', 'https://api.github.com'])
      section.setAttribute('data-tw-page-key', pagePath)
      var stopWatching = mountGiscus(section, config, pagePath)
      return function () {
        stopWatching && stopWatching()
        if (section) {
          section.textContent = ''
        }
      }
    }, [pagePath, configKey])

    if (!isValidConfig(config)) {
      return null
    }

    return React.createElement('section', {
      ref: ref,
      className: 'tw-giscus-comments',
      style: {
        display: 'block',
        width: '100%',
        maxWidth: config.maxWidth + 'px',
        margin: '32px auto 0',
        padding: 0,
        boxSizing: 'border-box',
        clear: 'both',
      },
    })
  }

  var pluginConfig = {
    name: 'giscus',
    config: configSchema,
    components: {
      'page:article:after': GiscusComments,
    },
  }

  var plugin = TopWrite.Plugin ? new TopWrite.Plugin(pluginConfig) : pluginConfig
  window.TopWritePlugins = window.TopWritePlugins || {}
  window.TopWritePlugins.giscus = plugin
})()
