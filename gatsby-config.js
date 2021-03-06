require("dotenv").config()

const queries = require("./src/utils/algoliaQueries")

const pluginsConfig = [
  `gatsby-plugin-transition-link`,
  `gatsby-plugin-styled-components`,
  `gatsby-plugin-react-helmet`,
  // needs to be the first to work with gatsby-remark-images
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `uploads`,
      path: `${__dirname}/static/assets/img`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `posts`,
      path: `${__dirname}/posts`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `posts`,
      path: `${__dirname}/projects`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `posts`,
      path: `${__dirname}/pages`,
    },
  },
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: "gatsby-remark-relative-images-v2",
          options: {
            name: "uploads",
          },
        },
        {
          resolve: "gatsby-remark-images",
          options: {
            maxWidth: 960,
            linkImagesToOriginal: false,
          },
        },
        "gatsby-remark-lazy-load",
        "gatsby-remark-prismjs",
      ],
    },
  },
  `gatsby-plugin-image`,
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Lucas Marques - Blog`,
      short_name: `LM - Blog`,
      start_url: `/`,
      background_color: `#f0f0f3`,
      theme_color: `#f0f0f3`,
      display: `minimal-ui`,
      icon: `src/images/icon.png`, // This path is relative to the root of the site.
    },
  },
  `gatsby-plugin-sitemap`,
  // this (optional) plugin enables Progressive Web App + Offline functionality
  // To learn more, visit: https://gatsby.dev/offline
  `gatsby-plugin-offline`,
  `gatsby-plugin-netlify-cms`,
]

if (process.env.CONTEXT === "production") {
  const algolia = {
    resolve: `gatsby-plugin-algolia-search`,
    options: {
      appId: process.env.GATSBY_ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_ADMIN_KEY,
      indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
      queries,
      chunkSize: 10000,
      enablePartialUpdates: true,
    },
  }

  const analytics = {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: process.env.GOOGLE_ANALYTICS_ID,
      head: false,
    },
  }

  pluginsConfig.push(algolia)
  pluginsConfig.push(analytics)
}

module.exports = {
  siteMetadata: {
    title: `Lucas Marques - Blog`,
    position: `Desenvolvedor Web`,
    description: `Blog para anotações sobre qualquer coisa que eu estiver estudando.`,
    author: `@lucas_marques`,
    authorDescription: `Desenvolvedor Web | Node.js | React | Redux | Tests | DevOps`,
    siteUrl: "https://lucasmarques.dev",
    disqusShortName: "lucas-marques-dev",
    postsConfig: {
      postsPerPage: 6,
      postsBasePath: "/",
    },
    pages: [
      {
        label: "Home",
        url: "/",
      },
      {
        label: "Projetos",
        url: "/projects",
      },
      {
        label: "Sobre",
        url: "/about",
      },
    ],
    socialLinks: [
      {
        label: "Github",
        url: "https://github.com/lucasmarques73",
      },
      {
        label: "Twitter",
        url: "https://twitter.com/lucas_marques",
      },
      {
        label: "Linkedin",
        url: "https://linkedin.com/in/lucasmarques73",
      },
    ],
  },
  plugins: pluginsConfig,
  flags: {
    DEV_SSR: false,
    FAST_DEV: true
  }
}
