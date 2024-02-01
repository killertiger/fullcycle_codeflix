# Full Cycle Code Flix

This project uses the backend created on the repository: https://github.com/argentinaluiz/micro-frontend-old.git


Before start the app you need to:
Clone
```
git clone https://github.com/argentinaluiz/micro-frontend-old.git
cd micro-frontend-old-backend-1
docker compose up -d backend
```

## Development

Install packages
```
yarn install
``` 

Running the app

```
yarn start
```

Generate test coverage statistics
```
yarn test --coverage .
```

Chrome extension:
[Redux DevTools](https://chromewebstore.google.com/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?pli=1)


### packages:

- react-router-dom - Create the routes
- mui - Material Design
- [@mui/x-data-grid](https://mui.com/x/react-data-grid/getting-started/) - Data grid with filter, pagination, ordering, etc.
- [@mui/icons-material](https://mui.com/material-ui/icons/) - Icons from Material Design
- [notistack](https://notistack.com/) - React Snackbars
- [@testing-library/react](https://testing-library.com/) - Testing library
- [msw](https://mswjs.io/) - Mock Service Worker for APIs
- [axios](https://axios-http.com/docs/intro) - Promise based HTTP client for the browser and node.js


### External References
https://app.quicktype.io/ - Convert JSON into gorgeous, typesafe code in any language.