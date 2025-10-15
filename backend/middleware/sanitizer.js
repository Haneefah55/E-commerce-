import sanitizeHtml from 'sanitize-html'


export const sanitizer = (req, res, next) =>{

  const clean = (obj) =>{
    for(let key in obj) {
      if(typeof obj[key] === 'string') {

        //clean string input
        let sanitized = sanitizeHtml(obj[key], {
          allowedTags: [],   // no html tags allowed
          allowedAttributes: {} // no html attributes allowed
        })

        // option remove html entities

        sanitized = sanitized.replace(/&gt;/g, ">")
          .replace(/&lt;/g, "<")
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")

          obj[key] = sanitized
          
      } else if(typeof obj[key] === "object" && obj[key] !== null) {

        

        //clean nested objects like req.body.user.name

        clean(obj[key])

      }
    }

  }

  clean(req.body)
  clean(req.query)
  clean(req.params)

  next()
  
  


}