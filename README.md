# Elegant-React-SSR
Server-side rendering with create-react-app, React Router v4, Helmet, Redux, and Thunk boilerplate, without ejecting CRA.
this boilerplate is heavily inspired by [this medium article](https://medium.com/@cereallarceny/server-side-rendering-in-create-react-app-with-all-the-goodies-without-ejecting-4c889d7db25e), and using under the hood [React-Frontload](https://github.com/davnicwil/react-frontload). reach out for docs.


Client render                   | Server render
:------------------------------:|:-----------------------------:
![](/public/csr.gif) |![](/public/ssr.gif)




# Server-side rendering in Create React App

_SSR with all the goodies, without ejecting._


## Goals

- **Zero modifications to your existing CRA application**
- Create React App **without ejecting**
- React 16 (fiber, baby!)
- React Router v4 (with Thunk)
- **Full SEO support** via React Helmet
- **Preloaded page data** via async/await and React Frontload
- **Code splitting** via React Loadable



## Getting Started

Clone the repo:
```sh
git clone https://github.com/SaeedSheikhi/elegant-react-ssr.git
cd elegant-react-ssr
```

Install yarn:
```js
npm install -g yarn
```

Install dependencies:
```sh
yarn
```

Set environment (vars):
```sh
cp .env.example .env.development
cp .env.example .env.production
```

Run application:
```sh
# Start on SSR mode on Unix machines
yarn build && yarn serve:unix
# Start on SSR mode on Windos machines
yarn build && yarn serve:win

# Start on CSR mode
yarn start
```


## Why?

Server-side rendering is a requirement for many modern web applications to appear correctly in search engines and social media parsers.

**Question:** Have you ever created a web application with multiple pages only to find out that your meta descriptions weren't page specific?<br />
**Answer:** _Server-side rendering_

**Question:** Have you ever created a web application where users had individual profile pages that required pre-loading of metadata?<br />
**Answer:** _Server-side rendering_

**Question:** Have you ever created a web application with a lot of content on your page that ends up taking a long time for your users to load in poor Internet conditions?<br />
**Answer:** _Server-side rendering_

## Contribute

Do what you normally do - fork and PR.
