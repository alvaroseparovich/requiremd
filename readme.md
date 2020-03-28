# requiremd

This is a module to fastly get your markdown archive to a object friendly
---

## How to use

Import the module and drop the path into it:
```js
 const requiremd = require('requiremd')
 const mdObj = requiremd('./pathToMarkdownFile')
 ```

## Example of Markdown and its Output

Here a Example of Markdown:
```md
---
title: Great article
author: R.J. Rushdoony, J. Morecraft
data: 1989-10-10
article-tag: Theonomy
---
# Great Article
Great text
```
Here a example of output:
```json
{
  "body": "# Great Article\nGreat text",
  "title": "Great article",
  "author": "R.J. Rushdoony, J. Morecraft",
  "data": "1989-10-10",
  "article-tag": "Theonomy"
}

```

## Important

Reserved word ```body```