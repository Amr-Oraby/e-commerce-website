# Cursor Remote - SSH

Connect to any remote machine with an SSH server and use it as your development environment. This extension enables seamless remote development with powerful features.

## Features

- Develop on remote machines with different operating systems or specialized hardware
- Switch between remote environments safely without affecting your local machine
- Access your development environment from any location
- Debug applications running on remote servers or cloud environments

All development work happens directly on the remote machine - no local source code required. Work with remote folders just as you would with local ones.

## Requirements



### Supported Platforms

- **Linux**:
  - *As of Cursor 3.10*: The standard server moved to Node.js 22, and requires glibc 2.28+  
    - Ubuntu 20.04+
    - Debian 10+
    - RHEL / CentOS / Rocky / AlmaLinux 8+
    - Fedora 29+
    - Alpine (*) 3.13+ (musl 1.2.3+)
    - FreeBSD (**) via Linux binary compatibility.
  - *Before 3.10* via Node.js 20:
    - Ubuntu 18.04
    - Debian 9
    - CentOS / RHEL 7
  - See [Linux runtime requirements](#linux-runtime-requirements) for exact library versions.
- **Windows**: Windows 10+/Server 2016/2019 (1803+) with [OpenSSH Server](https://docs.microsoft.com/windows-server/administration/openssh/openssh_install_firstuse)
- **macOS**: 10.14+ (Mojave) with [Remote Login enabled](https://support.apple.com/guide/mac-help/allow-a-remote-computer-to-access-your-mac-mchlp1066/mac)



### System Requirements

- Remote host must have:
  - `bash` (macOS/Linux) or `powershell` (Windows)
  - `wget` or `curl`
  - SSH server that permits forwarding — TCP forwarding, or (for hosts where loopback TCP is unavailable) stream-local/Unix socket forwarding — see [Connecting to hosts where loopback TCP is unavailable](#connecting-to-hosts-where-loopback-tcp-is-unavailable)



### Linux runtime requirements

The Cursor server runs on the **remote host**, which (as of Cursor 3.10) must provide:

- **glibc** 2.28+ (or **musl** 1.2.3+ on Alpine)
- **GLIBCXX** (libstdc++.so.6) 3.4.25+ — 3.4.26+ on 32-bit ARM (`armv7l` / `armv8l`)


### *Alpine Linux Specific Notes

1. Requires Cursor v0.50.5 or newer
2. Install required packages:
  ```bash
   apk add bash libstdc++ openssh wget
  ```
3. Enable port forwarding:
  - Edit `/etc/ssh/sshd_config`
  - Set `AllowTcpForwarding yes`
  - Restart SSH: `service sshd restart`



### **FreeBSD Specific Notes

Cursor on FreeBSD requires `bash`, `wget`, and Linux Binary Compatibility.

1. Requires Cursor v0.50.5 or newer
2. Install required packages:
  ```bash
   sudo sysrc linux_enable="YES"
   sudo service linux start
   sudo pkg install bash wget linux_base-rl9
  ```



## Connecting to hosts where loopback TCP is unavailable

By default the extension reaches the remote Cursor server through SSH TCP/dynamic (SOCKS) port forwarding to a loopback TCP port. That requires both `AllowTcpForwarding yes` on the remote `sshd` and the ability to use loopback TCP on the remote. Some hosts permit forwarding but make loopback TCP unusable — for example a shared login node where the server cannot bind a `127.0.0.1` port (sandbox, network namespace, or firewall), or one that only allows stream-local (Unix domain socket) forwarding (`AllowStreamLocalForwarding yes`, the OpenSSH default).

For those hosts, enable **stream-local forwarding mode**. The remote servers then listen on Unix sockets that are forwarded over SSH with `ssh -L` (local TCP port → remote Unix socket) instead of a SOCKS proxy, mirroring VS Code's `remote.SSH.remoteServerListenOnSocket`. This also gives each user a private socket instead of a shared loopback TCP port.

Enable it per host (or globally) in your settings:

```jsonc
{
  // Per host:
  "remote.SSH.remoteServerListenOnSocket": { "loginnode.example.com": true },
  // ...or for all hosts:
  "remote.SSH.remoteServerListenOnSocket": true
}
```

By default the sockets live in a per-connection `0700` directory under `/tmp` (the sockets themselves are `0600`). If `/tmp` is unsuitable on a host, point it elsewhere with a per-host parent directory. The path is used literally; shell variables such as `$USER` are not expanded.

```jsonc
{
  "remote.SSH.serverSocketPath": { "loginnode.example.com": "/scratch/alice/cursor-sockets" }
}
```



### Requirements and limitations

- **Remote host** must be Linux or macOS (a Windows remote cannot expose the server on a Unix socket and always uses SOCKS).
- **Local client** can be Windows, macOS, or Linux, but needs an OpenSSH 6.7+ client (the local end of the forward is a plain TCP port; only the remote end is a Unix socket). Modern macOS/Linux and current Win32-OpenSSH qualify.
- **Automatic forwarding of arbitrary remote application ports** (e.g. a dev server on `127.0.0.1:3000`) is unavailable in this mode, because that still requires TCP (`direct-tcpip`) forwarding. This matches VS Code's behavior in socket mode.
- **This does not bypass a hard `AllowTcpForwarding no`**.** Stock OpenSSH 9.2+ gates stream-local (`direct-streamlocal`) forwarding behind `AllowTcpForwarding` too, so the remote `sshd` must still permit forwarding. This mode helps when forwarding is allowed but loopback TCP itself is unusable — not when forwarding is disabled outright.



## Opening Remote Folders via the CLI

It is possible to open workspaces on a work machine directly via the `cursor` CLI via the following command:

```bash
cursor --folder-uri vscode-remote://ssh-remote+<hostname>/<folder_path>
```

The `hostname` should be the same entry that is in the SSH config file. The `folder_path` should be the complete path on the remote system. For example to open `/app` on `loginnode`:

```bash
cursor --folder-uri vscode-remote://ssh-remote+loginnode/app
```

If you need to specify additional arguments such as a user or a port, use this alternative syntax, where the `hostname` is a hex-encoded JSON string of the full connection uri. For example, to connect to `76.76.21.21` on port `22` as the `root` user:

```bash
SSH_CONF='{"hostName":"root@76.76.21.21 -p 22"}'
SSH_HEX_CONF=$(printf "$SSH_CONF" | od -A n -t x1 | tr -d '[\n\t ]')
cursor --folder-uri vscode-remote://ssh-remote+${SSH_HEX_CONF}/app
```



## Security Warning

⚠️ Only connect to trusted remote machines. A compromised remote system could potentially execute code on your local machine through the Remote-SSH connection.