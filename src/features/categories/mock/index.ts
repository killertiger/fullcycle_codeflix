export const categoryResponse = {
   "data":[
      {
         "id":"dd5378ef-1241-4b2e-b2d6-4b8dc8a2972d",
         "name":"LightPink",
         "description":"Nostrum accusamus veniam qui dolor id.",
         "is_active":true,
         "deleted_at":null,
         "created_at":"2023-12-20T10:22:33+0000",
         "updated_at":"2023-12-20T10:22:33+0000"
      },
      {
         "id":"2e0a6062-e9f1-49e4-ba9d-1d5f87711e86",
         "name":"Peru",
         "description":"Assumenda quia quos nam quia.",
         "is_active":true,
         "deleted_at":null,
         "created_at":"2023-12-25T11:40:18+0000",
         "updated_at":"2023-12-25T11:40:18+0000"
      },
   ],
   "links":{
      "first":"http:\/\/localhost:8000\/api\/categories?page=1",
      "last":"http:\/\/localhost:8000\/api\/categories?page=7",
      "prev":null,
      "next":"http:\/\/localhost:8000\/api\/categories?page=2"
   },
   "meta":{
      "current_page":1,
      "from":1,
      "last_page":7,
      "path":"http:\/\/localhost:8000\/api\/categories",
      "per_page":15,
      "to":15,
      "total":100
   }
}

export const categoryResponsePage2 = {
   "data":[
      {
         "id":"554c8ac7-98c1-471e-9a9a-bb6c4dac7e76",
         "name":"LightSeaGreen",
         "description":"Quae quis rerum dolore velit architecto sit voluptatum.",
         "is_active":true,
         "deleted_at":null,
         "created_at":"2023-12-25T11:40:18+0000",
         "updated_at":"2023-12-25T11:40:18+0000"
      },
   ],
   "links":{
      "first":"http:\/\/localhost:8000\/api\/categories?page=1",
      "last":"http:\/\/localhost:8000\/api\/categories?page=7",
      "prev":"http:\/\/localhost:8000\/api\/categories?page=1",
      "next":"http:\/\/localhost:8000\/api\/categories?page=3"
   },
   "meta":{
      "current_page":2,
      "from":1,
      "last_page":7,
      "path":"http:\/\/localhost:8000\/api\/categories",
      "per_page":15,
      "to":15,
      "total":100
   }
}