# React Shell

A React component for building your own interactive shell in the browser.

## Features

* Fully customizable commands
* Each command will receive
    * The arguments passed by the user
    * buffer controls for modifying the buffer output (appending/clearing messages)
* Async (Promise) commands are supported out of the box (input is disabled until promise resolves)

## Roadmap

- [ ] Optional built in commands such as `help` and `clear`
- [ ] More control over buffer output formatting

This project is heavily inspired by [`react-command-line`](https://github.com/podrezo/react-command-line). While I did
write this from scratch, I borrowed several concepts from that project, and I would like to credit their contribution. 


