const fetchPosts = async () => {
    try {
      const headers = {
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
        "gcms-locales": "es_ES",
      };

      const requestBody = {
        query: `query Posts {
                posts {
                  createdAt
                  id
                  lastModificationDate
                  publishDate
                  publishedAt
                  subtitle
                  title
                  updatedAt
                  body {
                    text
                  }
                }
              }`,
        variables: null,
      };

      const options = {
        method: "POST",
        headers,
        body: JSON.stringify(requestBody),
      };

      const response = await (await fetch(process.env.NEXT_PUBLIC_CONTENT_URL ?? '' , options)).json();

      console.debug(response?.data);
    } catch (e) {
      console.error(e);
    }
  };

  export default fetchPosts;