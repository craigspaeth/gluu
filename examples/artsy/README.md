# Artsy Clone

This attempts to recreate the show page on Artsy full-stack.

Seed the db using these GraphQL queries

```
mutation {
  updateShow(
    _id: "57bbd22d3d82039cf2078382"
    artworkIds: [
      "57bbdb83a7fda320f9d1df8d"
      "57bbe0be91489f57fb2a71b2"
      "57bbe0c691489f57fb2a71b3"
      "57bbe0cd91489f57fb2a71b4"
    ]
    name: "Frank Stella: A Retrospective"
    description: "'Frank Stella: A Retrospective' highlights the transitions that connect aspects of Stella's diverse body of work, acknowledging the artist’s different phases but positioning them as pieces of a coherent whole."
    partnerId: "57bbe5bdd64bf73600d70b59"
    startAt: "2016-04-17T12:00:00+00:00"
    endAt: "2016-09-18T12:00:00+00:00"
    address: {
      street: "3200 Darnell Street"
      city: "Fort Worth"
      country: "US"
      state: "TX"
      coordinates: {
        lng: -97
        lat: 32
      }
    }
  ) {
    _id
    name
  }
}

mutation {
  updateArtwork(
    _id: "57bbdb83a7fda320f9d1df8d"
    title: "Gran Cairo"
    date: "Thu Feb 01 1962 00:00:00 GMT-0500 (EST)"
    artistName: "Frank Stella"
    imageSrc: "https://d32dm0rphc51dk.cloudfront.net/id_XVT7dob-leEZEGXOonQ/large.jpg"
    partnerId: "57bbe5bdd64bf73600d70b59"
  ) {
    _id
    title
  }
}

mutation {
  updatePartner(
    _id: "57bbe5bdd64bf73600d70b59"
    name: "Modern Art Museum of Fort Worth"
  ) {
    _id
    name
  }
}
```