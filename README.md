# React Shell

A React component for building your own interactive shell in the browser.

## Warning

This is a very early version and is probably not ready for production use. I plan on integrating it with a project I am working on, and using that real-world integration as a method to iron out the API. Right now, the component API should be considered unstable between versions.

## Features

* Fully customizable commands
* Each command will receive
    * The arguments passed by the user
    * buffer controls for modifying the buffer output (appending/clearing messages)
* Async (Promise) commands are supported out of the box (input is disabled until promise resolves)

## Getting Started

Install via your package manager of choice

```shell
npm install @mando75/react-shell
# OR
yarn add @mando75/react-shell
# OR
pnpm add @mando75/react-shell
```

Import Component + styles into your app

```typescript
import ReactShell, { IReactShellProps } from '@mando75/react-shell'


```

## Roadmap

- [ ] Optional built in commands such as `help` and `clear`
- [ ] More control over buffer output formatting

This project is heavily inspired by [`react-command-line`](https://github.com/podrezo/react-command-line). While I did
write this from scratch, I borrowed several concepts from that project, and I would like to credit their contribution. 


