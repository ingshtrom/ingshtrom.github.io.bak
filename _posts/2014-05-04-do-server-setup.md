---
layout: post
title:  "DigitalOcean VPS Setup"
date:   2014-05-04 12:22:00
categories: guide digital-ocean ubuntu vps server-setup security mail postfix iptables tripwire
---

This is a short guide to setting up a VPS using [Ubuntu 12.04.4 LTS][ubuntu-12.04.4]. Most of this is for archiving my personal server setup checklist, but maybe it will help you too. 

I prefer to use [DigitalOcean][do] for my hosting.  They are affordable and reliable; what more can you ask from a hosting platform? 

I am assuming that you have already setup a droplet and have ssh access to your VPS. You also have a user other than root to perform all other steps. You should never run normal day-to-day operations with root, although I do run with a user that has sudo privileges.

Many (if not all) of these have guides originating from DigitalOcean at their [support site][do-support-guides].

### Postfix

[Postfix installation][do-guide-postfix] is pretty painless. There is no special configuration.

### IPTables

This seems to be the "default" Ubuntu firewall. I followed the [guide from DigitalOcean][do-guide-iptables]. IPTables should already be installed by default. Here is what I did:

{% highlight bash %}
# keep all current connections open
> sudo iptables -A INPUT -m conntrack --ctstate ESTABLISHED,RELATED -j ACCEPT
# allow loopback functionality
> sudo iptables -A INPUT -i lo -j ACCEPT
# allow ssh connections
> sudo iptables -A INPUT -p tcp --dport ssh -j ACCEPT
# allow http connections
> sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
# allow smtp connections
> sudo iptables -A INPUT -p tcp --dport 25 -j ACCEPT
# all connections after this are denied
> sudo iptables -A INPUT -j DROP
# list the entries we just put in 
> sudo iptables -L
{% endhighlight %}

To keep these settings after reboot, use iptables-persistent

{% highlight bash %}
> sudo apt-get install iptables-persistent
# say yes to any prompts
> sudo service iptables-persistent start
{% endhighlight %}

### TripWire

[This guide][do-guide-tripwire] does a great job of explaining everything to do. It is a bit more complex, so I will not summarize it here. 

### ThinkUp

I will have a full guide for this soon! In the meantime you can signup for [ThinkUp][th]!

[do]: https://digitalocean.com/
[do-support-guides]: https://www.digitalocean.com/community/articles
[do-guide-iptables]: https://www.digitalocean.com/community/articles/how-to-set-up-a-firewall-using-ip-tables-on-ubuntu-12-04
[do-guide-tripwire]: https://www.digitalocean.com/community/articles/how-to-use-tripwire-to-detect-server-intrusions-on-an-ubuntu-vps
[do-guide-postfix]: https://www.digitalocean.com/community/articles/how-to-install-and-setup-postfix-on-ubuntu-14-04
[ubuntu-12.04.4]: http://releases.ubuntu.com/12.04/
[th]: https://www.thinkup.com/