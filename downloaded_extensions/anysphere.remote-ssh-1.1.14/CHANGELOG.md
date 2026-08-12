# Cursor Remote SSH Changelog

# 1.1.14
- Fix connection failures for older SSH remote authorities that stored `user@host` in a single host field.
- Fix incorrect Bandwidth Usage chart labels when SSH throughput is near zero.

# 1.1.13
- Improve connection diagnostics for SSH timeouts, proxy command failures, and connections closed before setup completes.

# 1.1.12
- Improve connection diagnostics for remote hosts.

# 1.1.11
- Fix an issue where SSH reconnection could time out after the short window for reusing an existing connection had expired, instead of falling through to a full reconnect.

# 1.1.10
- The legacy server is only selected when its artifact exists for the connecting client's commit; detection fails open to the regular server package.

# 1.1.9
- Fix an issue where connection retries could stall after a failed or interrupted remote server installation.

# 1.1.8
- Improve connection progress and cancellation in the Agents Window. Cancelled or superseded SSH attempts now stop outstanding prompts, subprocesses, retries, and temporary port forwarding.
- Improve reconnection reliability by preventing stale connection attempts from replacing a newer connection and by preserving connections when optional editor setup fails.

# 1.1.7
- Fix base decoding on Linux.
- Document requirements for linux

# 1.1.6
- Fix race condition during handshake

# 1.1.5
- Fix exe path execution on windows host

# 1.1.4
- Improve connection diagnostics for remote hosts.

# 1.1.3
- Fix an issue where Remote SSH server installation could fail when a remote login shell command reads from standard input during setup.
- Improve connection setup on slow or NFS-mounted filesystems by cleaning up stale server builds in the background instead of blocking setup.

# 1.1.2
- Fix an issue where the remote server could fail to start or reuse an existing server when other shells are aliased as bash on the remote host.

# 1.1.1
- Add the `remote.SSH.remoteServerListenOnSocket` setting, which provides an alternative connection method for hosts where the default method does not work. Enable it when the remote cannot use a loopback `127.0.0.1` port (for example, a sandboxed or network-namespaced login node) or only permits stream-local forwarding; the server is then forwarded over a per-user Unix domain socket (`ssh -L`) instead of loopback TCP. If needed, use the companion `remote.SSH.serverSocketPath` setting to change where those sockets are created. Requires a Linux/macOS remote.

# 1.0.54
- Fix a spurious error in the Agents Window.

# 1.0.53
- Accept full pasted `ssh` commands (including common flags and quoted options) in the Connect via SSH picker, not only `user@host` and `host:port` forms.
- In the Agents Window, stop automatically opening the Remote - SSH output panel during background connection work.

# 1.0.52
- Fix an issue where `user@host`, `host:port`, and `user@host:port` inputs were silently rejected by the Connect via SSH picker.
- Preserve IPv6 literals (e.g. `::1`, `2001:db8::1`) and configured Host aliases containing a colon (e.g. `prod:staging`) in the Connect via SSH picker.
- Surface a visible error message when a Connect via SSH input fails validation.

# 1.0.51
- Bug fixes.

# 1.0.50
- Restore the clickable "details" link in the "Setting up SSH Host" progress notification in the Agents Window.

# 1.0.49
- Show the host name in the "Setting up SSH Host" progress notification so it's clear which connection the notification belongs to, and shorten the retry message for readability.

# 1.0.48
- Add support for the `Generate Connection Report` action in the Agents Window.

# 1.0.47
- Apply copy-over-SSH timeouts after the SSH handshake and use `remote.SSH.connectTimeout` (minimum 120 seconds) for transfers instead of a fixed five-minute limit, so large or slow uploads are less likely to fail.

# 1.0.46
- Improve diagnostics for canceled and aborted SSH connection attempts.

# 1.0.45
- Improved error reporting for remote connection failures.

# 1.0.44
- Improve install reliability on slow or NFS-mounted drives.
- Increase timeouts for parallel installs and high-latency connections.

# 1.0.43
- Handle conflicting remote server data paths by safely backing up non-directory `.cursor-server` entries before install.
- (Windows Remotes) Compress the install script payload before transport to avoid `cmd.exe` command-length limitation.
- Add GPG forwarding support for remote instances and dev containers.
- Cap the maximum install time to prevent keep-alive output from extending timeouts indefinitely.
- Improve install reliability on slow or high-latency connections by deferring the timeout until the SSH handshake is established.
- Keep SSH connections alive during server extraction to prevent client-side timeouts.
- Fix a dangling timer bug in timeout handling when a copy handshake completes after rejection.

# 1.0.39
- Fix issues with connection lockfile cleanup

# 1.0.38
- Fix a regression introduced in 1.0.37 when connecting to Windows remote hosts

# 1.0.37
- Fixed a bug where changing the architecture of the SSH host was not supported, and required that the remote server installation directory be manually wiped
- Fix Remote SSH crashes when the server installation path contains spaces
- Fix X11 forwarding breaking after window reload by capturing the DISPLAY environment variable per SSH connection

# 1.0.36
- Improve preconnect script dialog: add "View Script" button to view the script before running it
- Automatically switch to Remote - SSH output panel if preconnect script takes longer than 5 seconds
- Line buffer preconnect script output

# 1.0.35
- Add support for the `remote.SSH.preconnect` setting, which allows for a script to be executed before each SSH connection
- Manually prompt for the platform if automatic platform detection fails
- Fix a performance issue where spinners continued forever after all reconnection attempts were exhausted

# 1.0.34
- Fix an issue where `remote.SSH.defaultForwardedPorts` could not be configured at the workspace level

# 1.0.33
- Fix an issue where ports specified in the `LocalForward` option of a SSH config file were forwarded with incorrect port numbers

# 1.0.32
- Fix an issue (from version 1.0.31) where connections fail to start

# 1.0.31
- Add the setting `remote.SSH.serverPickPortsFromRange`, which ensures that the remote server ports are in the given range

# 1.0.30
- Lower the default connect timeout to 30 seconds (previously 3 minutes)

# 1.0.29
- Fix issues with X11 forwarding

# 1.0.28
- Bug fixes and improvements

## v1.0.27
- Reduce resource utilization for keeping the SSH tunnel alive
- Add a traffic monitor to monitor remote SSH traffic
- On windows clients, launch the SSH process using a `cmd` shell instead of powershell

## v1.0.26
- Fix an issue where periodic keep-alive pings to the remote command server are interrupted, causing future connection checks to fail.

## v1.0.25
- Fix an issue where automatic reconnections would fail due to failed process termination

## v1.0.24
- Add support for using an interactive terminal when establishing the SSH connection via the setting `remote.SSH.showLoginTerminal`.
- Add the setting `remote.SSH.logLevel`, which can be `trace` or `debug`. Defaults to debug, which is less verbose than previously.
- On failed SSH connections, added buttons to copy the logs to the clipboard and open the SSH config file.

## v1.0.23
- Add the setting `remote.SSH.defaultForwardedPorts`, which allows ports to be forwarded by default on all hosts
- Remove a connection check that caused timeouts and connection failures for otherwise successful connections
- Fix a bug where the `remote.SSH.configFile` argument was not used when calling the `ssh` executable

## v1.0.22
- Fix an issue where the `remote.localPortHost` setting was not respected when forwarding ports
- Add `code` and `cursor` to the `PATH` in the remote environment
- Forward ports for both `IPv4` and `IPv6`, and open ports on `localhost` instead of `127.0.0.1` locally

## v1.0.21
- (macOS / Linux Remotes) Fix stability with SSH agent forwarding.
- (macOS / Linux Remotes) Improve performance of remote server downloads.

## v1.0.20
- (macOS / Linux Remotes) Prefer using `/tmp` for temporary files if `XDG_RUNTIME_DIR` is set but not writable.

## v1.0.19
- (macOS / Linux Remotes) Increase the timeout to 90 seconds for checking the remote server ports

## v1.0.18
- (macOS / Linux Remotes) Move the log, token, and pid files to `/tmp` to eliminate issues when the server installation directory is on a slow disk
- Add the setting `remote.SSH.enableRemoteCommand`
- Add support for FreeBSD

## v1.0.17
- (macOS / Linux Remotes) Continue with establishing the connection even if the multiplex server fails to start. This feature is only required for Docker over SSH.

## v1.0.16
- Add config option `remote.SSH.serverShutdownTimeout` to change the default server shutdown timeout, after which the remote server will terminate due to inactivity. Default is 5 minutes (300 seconds). This setting requires Cursor 1.2 or greater.

## v1.0.15
- (Linux Clients) Explicitly unset 'ARGV0' when launching the SSH command to fix an issue with multiple jump hosts

## v1.0.14
- Refactor the reconnection logic to attempt to reuse existing SSH connections or socks connections, instead of always creating new ones.
- (Windows Remotes) Run Powershell with `-NoProfile`

## v1.0.13
- (macOS / Linux Remotes) Configured the installation script to run in a non-login shell

## v1.0.12
- (macOS / Linux Remotes) Fix a newline encoding issue that prevented the server from starting

## v1.0.11
- (macOS / Linux Clients): Always use a shell to launch the SSH client, and pass the command over stdin. Fixes issues where some hosts reject or truncate long command strings.
- Copy files over SSH instead instead of SCP

## v1.0.10
- (macOS / Linux Remotes) Fix an issue where the install script was running in a login shell, inheriting all bash options
- (macOS / Linux Remotes) Fix an issue where logfiles and lockfiles were not properly versioned

## v1.0.9
- (Windows Remotes) Fixed an issue where the fallback to SCP on failed downloads was not automatic

## v1.0.8
- Add an explicit error message when trying to use VSCode remote containers with Anysphere Remote SSH, as they are incompatible with each other
- Fallback to SCP'ing the server when the remote server fails to download directly

## v1.0.7
- Fix a bug where the Docker over SSH connection would terminate automatically after 5 minutes

## v1.0.6
- Remove the "Select Remote Platform" prompt for initial connection attempts. The new flow assumes that the remote system is running Linux/macOS
  and will only prompt if the initial connection attempt failed
- Show progress on remote server downloads
- Reset the connection timeout so long as downloads are making progress.

## v1.0.5
- (macOS / Linux Remotes) Automatically clear the lock file if it was left behind by a previous, failed connection attempt
- (macOS / Linux Remotes) Add a "Generate Connection Report" command to help diagnose connection issues
- (Windows clients) Replaced the SSH Askpass helper with a .bat script to resolve warnings from antivirus programs
- (Windows clients) Hide console host windows that appeared when using a SSH proxy or jump host


## v1.0.4
- Fix a bug, when using Remote Containers over SSH, spawned commands were not terminated when the window closed

## v1.0.3
- Fix a bug where private key arguments were not supported when manually pasting a connection string

## v1.0.2
- Add support for forwarding ports via SOCKS through the execServer. Helps improve the performance for Remote Containers over SSH (requires Anysphere Remote Containers v1.0.2 or greater)

## v1.0.1
- Fix an issue (introduced in v0.0.34) when connecting to remote hosts that default to Fish shells

## v1.0.0
- Simplified README

## v0.0.34
- Add support for Alpine linux remote extension hosts. Requires Cursor v0.50.5 or greater.

## v0.0.33
- Add support for cancelling connection attempts

## v0.0.32
- Upon temporary server disconnections, continuously attempt to reconnect for up to 5 minutes

## v0.0.31
- Fix an issue where the server fails to start on macOS remote hosts, due to a base64 decoding issue

## v0.0.30
- If the bundled NodeJS executable fails to run, fallback to using the system NodeJS executable (if available) and the system NodeJS version >= 20

## v0.0.29
- Increased default connection timeout to 180 seconds (up from 60 seconds)
- Fixed a race condition when starting the remote server, where it would fail to start on slow filesystems

## v0.0.28
- Implemented support for using a SSH remote as an intermediate resolver for connecting to a remote system

## v0.0.027
- Fixed an issue with server binaries failing to download

## v0.0.26
- Fixed a bug where SSH connection strings containing ports were not parsed properly in the "Remote-SSH: Connect to Host" command palette box

## v0.0.25
- Renamed `remote.SSH.serverDataFolderPath` to `remote.SSH.serverInstallPath` to match the `ms-vscode-remote.remote-ssh` extension.
- Fixed an bug where the `remote.SSH.serverInstallPath` setting did not apply to the `extension` and `data` sub-folders.
  Now, all remote server artifacts respect this setting.

## v0.0.24
- Added config options `remote.SSH.httpProxy`, `remote.SSH.httpsProxy`, and `remote.SSH.noProxy`, which will be used when downloading the remote server
  and during the remote sessions.

## v0.0.23

- Added prompt to reinstall the server on failed connections
- Added Kill Server and Reload Window Command
- Added Reinstall Server and Reload Window Command
- Moved cleanup of old server binaries to after the new server successfully launches
- Added config option `remote.SSH.serverDataFolderPath` for customizing the location of the remote server data folder

## v0.0.22

- Added telemetry (enabled when privacy mode is disabled)

## v0.0.21

- Switched installer script encoding to base64 to support `csh` SSH shells (for macOS / linux remote hosts)

## v0.0.20

- Added support for port forwarding
