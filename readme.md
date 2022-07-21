<h1 align="center">Welcome to Envfy Server 👋</h1>


Server for [Envfy](https://github.com/kelvinpraises/envfy) runs on Firebase

This project is currently experimental which aims to check if envirionmental social good can be funded through crowd participation and carried out by willing teams around the world. This uses IPFS and Ceramic Models for data storage.

## Data models created

<details open>
<summary>EnvfyProtocolState.json</summary>

```sh
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "EnvfyProtocolState",
  "type": "object",
  "default": {},
  "required": [
    "eventsCompleted",
    "pooledFunds",
    "envfyTeams",
    "lifetimePooledFunds"
  ],
  "additionalProperties": false,
  "properties": {
    "envfyTeams": {
      "type": "integer",
      "default": 0,
      "description": "Number of registered teams on Envfy"
    },
    "eventsCompleted": {
      "type": "integer",
      "default": 0,
      "description": "Environmental events completed by Envfy teams"
    },
    "pooledFunds": {
      "type": "integer",
      "default": 0,
      "description": "Current balance of donated funds"
    },
    "lifetimePooledFunds": {
      "type": "integer",
      "default": 0,
      "description": "Lifetime donation made into Envfy pooled funds"
    }
  }
}
```

</details>

<details>
<summary>EnvfyTeamPost.json</summary>

```sh
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "EnvfyTeamPost",
  "type": "object",
  "default": {},
  "required": [
    "type",
    "posterDid",
    "postDid",
    "postTitle",
    "allowComments",
    "createdAt"
  ],
  "additionalProperties": false,
  "properties": {
    "type": {
      "type": "string",
      "default": "",
      "description": "Type of post"
    },
    "posterDid": {
      "type": "string",
      "default": "",
      "description": "Poster unique decentralized id"
    },
    "postDid": {
      "type": "string",
      "default": "",
      "description": "Post unique decentralized id"
    },
    "allowComments": {
      "type": "boolean",
      "default": true,
      "description": "Allows or restricts comments on a post"
    },
    "postTitle": {
      "type": "string",
      "default": "",
      "description": "Title of post"
    },
    "mediaCid": {
      "type": "array",
      "default": [],
      "uniqueItems": true,
      "items": {
        "type": "string",
        "default": "",
        "description": "IPFS cid for video or image content"
      }
    },
    "body": {
      "type": "string",
      "default": "",
      "description": "Body of post"
    },
    "comments": {
      "type": "array",
      "default": [],
      "description": "Conversations made by users under a post",
      "uniqueItems": true,
      "items": {
        "type": "object",
        "default": {},
        "required": [
          "commenterDid",
          "comment",
          "createdAt"
        ],
        "additionalProperties": false,
        "properties": {
          "commenterDid": {
            "type": "string",
            "default": "",
            "description": "Commenter unique decentralized id"
          },
          "comment": {
            "type": "string",
            "default": "",
            "description": "Comment on post"
          },
          "createdAt": {
            "type": "string",
            "default": "",
            "description": "Date of comment creation"
          }
        }
      }
    },
    "createdAt": {
      "type": "string",
      "default": "",
      "description": "Date of post creation"
    }
  }
}
```

</details>

<details >
<summary>EnvfyTeam.json</summary>

```sh
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "EnvfyTeam",
  "type": "object",
  "required": [
    "teamDid",
    "teamName",
    "teamAvatar",
    "membersCount",
    "createdAt"
  ],
  "additionalProperties": false,
  "properties": {
    "teamDid": {
      "type": "string",
      "default": "",
      "description": "Team unique decentralized id"
    },
    "teamName": {
      "type": "string",
      "default": "",
      "description": "Name of team"
    },
    "teamAvatar": {
      "type": "string",
      "default": "",
      "description": "Url to team avatar"
    },
    "membersCount": {
      "type": "integer",
      "default": 0,
      "description": "Number of users in the team"
    },
    "adminsDid": {
      "type": "array",
      "default": [],
      "description": "Admin did list for the team",
      "uniqueItems": true,
      "items": {
        "type": "string",
        "default": "",
        "description": "Admin unique decentralized id"
      }
    },
    "moderatorsDid": {
      "type": "array",
      "default": [],
      "description": "Moderator did list for the team",
      "uniqueItems": true,
      "items": {
        "type": "string",
        "default": "",
        "description": "Moderator unique decentralized id"
      }
    },
    "posts": {
      "type": "array",
      "default": [],
      "description": "Post made by user in a group",
      "uniqueItems": true,
      "items": {
        "type": "object",
        "default": {},
        "required": [
          "type",
          "posterDid",
          "postDid",
          "title",
          "createdAt"
        ],
        "additionalProperties": false,
        "properties": {
          "type": {
            "type": "string",
            "default": "",
            "description": "Type of post"
          },
          "posterDid": {
            "type": "string",
            "default": "",
            "description": "Poster unique decentralized id"
          },
          "postDid": {
            "type": "string",
            "default": "",
            "description": "Post unique decentralized id"
          },
          "postTitle": {
            "type": "string",
            "default": "",
            "description": "Title of post"
          },
          "postSummary": {
            "type": "string",
            "default": "",
            "description": "Summary of post"
          },
          "createdAt": {
            "type": "string",
            "default": "",
            "description": "Date of post creation"
          }
        }
      }
    },
    "createdAt": {
      "type": "string",
      "default": "",
      "description": "Date of team creation"
    }
  }
}
```

</details>

<details >
<summary>EnvfyTeams.json</summary>

```sh
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "EnvfyTeams",
  "type": "array",
  "default": [],
  "description": "Array containing individual Team dids",
  "uniqueItems": true,
  "items": {
    "type": "object",
    "default": {},
    "required": [
      "teamDid",
      "teamName",
      "teamAvatar",
      "teamDescription",
      "membersCount",
      "createdAt"
    ],
    "additionalProperties": false,
    "properties": {
      "teamDid": {
        "type": "string",
        "default": "",
        "description": "Team unique decentralized id"
      },
      "teamName": {
        "type": "string",
        "default": "",
        "description": "Name of team"
      },
      "teamAvatar": {
        "type": "string",
        "default": "",
        "description": "Url to team avatar"
      },
      "teamDescription": {
        "type": "string",
        "default": "",
        "description": "About the team"
      },
      "membersCount": {
        "type": "integer",
        "default": 0,
        "description": "Number of users in the team"
      },
      "createdAt": {
        "type": "string",
        "default": "",
        "description": "Date of team creation"
      }
    }
  }
}
```

</details>

<details >
<summary>EnvfyTimeline.json</summary>

```sh
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "EnvfyTimeline",
  "type": "object",
  "default": {},
  "required": [
    "timelineDid",
    "userPosts",
    "events",
    "teamActivities",
    "createdAt"
  ],
  "additionalProperties": false,
  "properties": {
    "timelineDid": {
      "type": "string",
      "default": "",
      "description": "Timeline unique decentralized id"
    },
    "userPosts": {
      "type": "array",
      "default": [],
      "description": "An array of users posts",
      "uniqueItems": true,
      "items": {
        "type": "object",
        "default": {},
        "required": [
          "type",
          "mediaCid",
          "donation",
          "location",
          "createdAt"
        ],
        "additionalProperties": false,
        "properties": {
          "type": {
            "type": "string",
            "default": "",
            "description": "Content type of either video image or text"
          },
          "mediaCid": {
            "type": "array",
            "default": [],
            "uniqueItems": true,
            "items": {
              "type": "string",
              "default": "",
              "description": "IPFS cid for video or image content"
            }
          },
          "caption": {
            "type": "string",
            "default": "",
            "description": "Text description for post"
          },
          "donation": {
            "type": "string",
            "default": "",
            "description": "Amount of token donated"
          },
          "location": {
            "type": "object",
            "default": {},
            "required": [
              "country",
              "city"
            ],
            "additionalProperties": false,
            "properties": {
              "country": {
                "type": "string",
                "default": "",
                "description": "Country where activity in post takes place"
              },
              "city": {
                "type": "string",
                "default": "",
                "description": "City where activity in post takes place"
              }
            }
          },
          "createdAt": {
            "type": "string",
            "default": "",
            "description": "Date of post creation"
          }
        }
      }
    },
    "events": {
      "type": "array",
      "default": [],
      "description": "An array of Envfy events",
      "uniqueItems": true,
      "items": {
        "type": "object",
        "default": {},
        "required": [
          "type",
          "mediaCid",
          "createdAt"
        ],
        "additionalProperties": false,
        "properties": {
          "type": {
            "type": "string",
            "default": "",
            "description": "Content type of either video image or text"
          },
          "mediaCid": {
            "type": "array",
            "default": [],
            "uniqueItems": true,
            "items": {
              "type": "string",
              "default": "",
              "description": "IPFS cid for video or image content"
            }
          },
          "caption": {
            "type": "string",
            "default": "",
            "description": "Text description for post"
          },
          "createdAt": {
            "type": "string",
            "default": "",
            "description": "Date of post creation"
          }
        }
      }
    },
    "teams": {
      "type": "array",
      "default": [],
      "description": "An array of Team activities",
      "uniqueItems": true,
      "items": {
        "type": "object",
        "default": {},
        "required": [
          "type",
          "mediaCid",
          "caption",
          "createdAt"
        ],
        "additionalProperties": false,
        "properties": {
          "type": {
            "type": "string",
            "default": "",
            "description": "Content type"
          },
          "mediaCid": {
            "type": "array",
            "default": [],
            "uniqueItems": true,
            "items": {
              "type": "string",
              "default": "",
              "description": "IPFS cid for video or image content"
            }
          },
          "caption": {
            "type": "string",
            "default": "",
            "description": "Text description for team activity"
          },
          "createdAt": {
            "type": "string",
            "default": "",
            "description": "Date of activity creation"
          }
        }
      }
    },
    "createdAt": {
      "type": "string",
      "default": "",
      "description": "Date of Timeline creation"
    }
  }
}
```

</details>

<details >
<summary>EnvfyTimelines.json</summary>

```sh
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "EnvfyTimelines",
  "type": "array",
  "default": [],
  "description": "Array containing aggregated Timeline dids",
  "uniqueItems": true,
  "items": {
    "type": "object",
    "default": {},
    "required": [
      "timelineDid",
      "createdAt"
    ],
    "additionalProperties": false,
    "properties": {
      "timelineDid": {
        "type": "string",
        "default": "",
        "description": "Timeline unique decentralized id"
      },
      "createdAt": {
        "type": "string",
        "default": "",
        "description": "Date of Timeline creation"
      }
    }
  }
}
```

</details>

<details >
<summary>EnvfyUserProfile.json</summary>

```sh
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "EnvfyUserProfileSchema",
  "type": "object",
  "required": [
    "userDid",
    "userAvatar",
    "tokenBalance",
    "createdAt"
  ],
  "additionalProperties": false,
  "properties": {
    "userDid": {
      "type": "string",
      "default": "",
      "description": "User unique decentralized id"
    },
    "userAvatar": {
      "type": "string",
      "default": "",
      "description": "Url to user avatar"
    },
    "tokenBalance": {
      "type": "integer",
      "default": 0,
      "description": "Token balance for user"
    },
    "lifetimeDonation": {
      "type": "integer",
      "default": 0,
      "description": "Total user donations to Envfy pooled funds"
    },
    "userTeams": {
      "type": "array",
      "default": [],
      "description": "Envfy teams user joins",
      "uniqueItems": true,
      "items": {
        "type": "object",
        "default": {},
        "required": [
          "name",
          "url"
        ],
        "additionalProperties": false,
        "properties": {
          "name": {
            "type": "string",
            "default": "",
            "description": "Team verified name"
          },
          "url": {
            "type": "string",
            "default": "",
            "description": "Url to teams page on Envfy"
          }
        }
      }
    },
    "userPosts": {
      "type": "array",
      "default": [],
      "description": "Post made to donate into Envfy pooled funds",
      "uniqueItems": true,
      "items": {
        "type": "object",
        "default": {},
        "required": [
          "type",
          "mediaCid",
          "donation",
          "location",
          "createdAt"
        ],
        "additionalProperties": false,
        "properties": {
          "type": {
            "type": "string",
            "default": "",
            "description": "Content type of either video image or text"
          },
          "mediaCid": {
            "type": "array",
            "default": [],
            "uniqueItems": true,
            "items": {
              "type": "string",
              "default": "",
              "description": "IPFS cid for video or image content"
            }
          },
          "caption": {
            "type": "string",
            "default": "",
            "description": "Text description for post"
          },
          "donation": {
            "type": "string",
            "default": "",
            "description": "Amount of token donated"
          },
          "location": {
            "type": "object",
            "default": {},
            "required": [
              "country",
              "city"
            ],
            "additionalProperties": false,
            "properties": {
              "country": {
                "type": "string",
                "default": "",
                "description": "Country where activity in post takes place"
              },
              "city": {
                "type": "string",
                "default": "",
                "description": "City where activity in post takes place"
              }
            }
          },
          "createdAt": {
            "type": "string",
            "default": "",
            "description": "Date of post creation"
          }
        }
      }
    },
    "userActivities": {
      "type": "array",
      "default": [],
      "description": "Misc data generated for user",
      "uniqueItems": true,
      "items": {
        "type": "object",
        "default": {},
        "required": [
          "type",
          "title",
          "createdAt"
        ],
        "additionalProperties": false,
        "properties": {
          "type": {
            "type": "string",
            "default": "",
            "description": "Type of activity"
          },
          "title": {
            "type": "string",
            "default": "",
            "description": "Title of activity"
          },
          "body": {
            "type": "string",
            "default": "",
            "description": "Text content of activity details"
          },
          "image": {
            "type": "string",
            "default": "",
            "description": "IPFS cid of image attached to activity"
          },
          "url": {
            "type": "string",
            "default": "",
            "description": "Internal or external url associated with activity"
          },
          "createdAt": {
            "type": "string",
            "default": "",
            "description": "Date of activity creation"
          }
        }
      }
    },
    "createdAt": {
      "type": "string",
      "default": "",
      "description": "Date of User creation"
    }
  }
}
```

</details>

</details>

<details >
<summary>model.json</summary>

```sh
{
  "definitions": {
    "envfyProtocolState": "kjzl6cwe1jw14910kd8szvbzkpvb6skvdlp762r5zueem7cd4m4yyi1h2beqqo4",
    "envfyTeam": "kjzl6cwe1jw1495hwbup2l0jp8wp0wol3onqb010w2kdpxq1ty2a3l0ozt5wtx4",
    "teamPost": "kjzl6cwe1jw147qksafbhdlzozohhrq1op92oitbp9ahombrnpi696dnq89gptf",
    "envfyTeams": "kjzl6cwe1jw1474m5s8yldof3mioe6sbuhexgyun7t80jpbsos5bq76zqfxzx44",
    "envfyTimeline": "kjzl6cwe1jw14a7ptlyf9rbnin0nptgr1lrzjefihfhcn81kfc1j4as7xl04l09",
    "envfyTimelines": "kjzl6cwe1jw148vvm1rmpe4w4untmwaynv4eimpplhfvy11p0r4145cyvp5xnwt",
    "envfyUserData": "kjzl6cwe1jw1489p3ghqpoyk0ike6s45oiurpanpdyywgcq9f1h8ciysbjvrh4o"
  },
  "schemas": {
    "EnvfyProtocolState": "ceramic://k3y52l7qbv1frye6u531fve6ytp8lmjh8cckwvshtfesj7hnwt9bjkxw54bsntkao",
    "EnvfyTeam": "ceramic://k3y52l7qbv1frxjpr9ptso1oi8af76s12psmdqwzmcq4t9onomo7yub96jns23nr4",
    "EnvfyTeamPost": "ceramic://k3y52l7qbv1frypka8zkwjhcydw7pcv6c9e3stfug6cxdmbxgwyc08kwdxi79bwg0",
    "EnvfyTeams": "ceramic://k3y52l7qbv1fry0cxymb62ayl9osrg6hwljd7y1pamenpnf10s4q57efbzlpq3b40",
    "EnvfyTimeline": "ceramic://k3y52l7qbv1frxrxpofxo81e1ijvry0hmfnp5klrg51mmqmfgnqmbj6ga2kj7se0w",
    "EnvfyTimelines": "ceramic://k3y52l7qbv1frxivl6ya8qnkaku32svtti42tvb8ilfk1ucfdp5pxid8s9q8y7myo",
    "EnvfyUserProfileSchema": "ceramic://k3y52l7qbv1frxklz3wqe010exhxgrf1plu5bwbt7409tcfmwej1svzfhmk0mfgu8"
  },
  "tiles": {}
}
```

</details>
