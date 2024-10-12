## **提取键盘数据USB.pcap中的明文数据**

1、linux的Tshark
```
sudo apt-get install tshark
tshark -r usb.pcap -T fields -e usb.capdata | sed '/^\s*$/d' > usbdata.txt
```

2、
python UsbKeyboardDataHacker.py key.pcap


3、
Jiayu工具箱：<https://github.com/isee15/ctf-tools/tree/master>