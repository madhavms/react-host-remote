## React Host Remote Example

This is an Micro-frontend host remote system implemented using React and Webpack module federation. Here the host application does module loading and dependency resolution of remote systems using the webpack module federation plugin.

In this application the widget(remote application) styles have been are isolated from host using style injection in shadow dom where the remotes are attached.

This repository is a monorepo managed with lerna and yarn workspaces.

- `hostApp` is the host application (http://localhost:3000).
- `finWidget` is a standalone application which exposes `StockWidget` component (http://localhost:3001).

In this application a stock price widget is loaded at runtime into a host system. The widget receives dummy stock prices from the API written using Python FASTAPI framework.

Usage of remote widget component:
1. Lazy load the widget component.
2. Pass the widget id and the callback to handle widget delete in host application.

```
const StockWidget = React.lazy(() => import("finWidget/StockWidget"));

<React.Suspense fallback={<WidgetPlaceholder />}>
    <StockWidget symbol={widget.id} handleDelete={handleDelete}/>
</React.Suspense>
```

## Starting the Frontend App:

Run `yarn start`.

This will build and serve `hostApp` and `finWidget` on the ports 3000 and 3001 respectively.

## Starting the Python API Service:

1. `cd finAPI/stockapi`

2. ` uvicorn main:app --reload`

### Host Application Demo

The host application shown below has added a drag and drop functionality using the widget.

![HostApplication.gif](https://github.com/madhavms/react-host-remote/blob/main/img/HostApplication.gif)

### Remote Application Demo

![RemoteApplication.gif](https://github.com/madhavms/react-host-remote/blob/main/img/RemoteApplication.gif)
