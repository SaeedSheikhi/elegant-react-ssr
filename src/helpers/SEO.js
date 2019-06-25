import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";

const SITE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://example.com";

const STATIC_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001"
    : "https://static.example.com";

const FACEBOOK_APP_ID = "XXXXXXXXX";

const defaultTitle =
  "React SSR" + " | " + "Zero Modification" + " | " + "Elegant";

const defaultDescription =
  "Elegant React SSR boilerplate" +
  "\n" +
  "Ready to use | Scalable to enterprise | CRA zero config | Server side react";

const defaultImage = `${SITE_URL}/apple-touch-icon.png`;
const defaultTwitter = "@example";
const defaultSep = " | ";

const getMetaTags = (
  {
    title,
    description,
    image,
    banner,
    contentType,
    twitter,
    noCrawl,
    published,
    updated,
    category,
    tags
  },
  pathname
) => {
  const theTitle = title ? title.substring(0, 60) : defaultTitle;
  const theDescription = description
    ? description.substring(0, 155)
    : defaultDescription;
  const theImage = image ? `${STATIC_URL}${image}` : defaultImage;

  const metaTags = [
    { itemprop: "name", content: theTitle },
    { itemprop: "description", content: theDescription },
    { itemprop: "image", content: theImage },
    { name: "description", content: theDescription },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:site", content: defaultTwitter },
    { name: "twitter:title", content: theTitle },
    { name: "twitter:description", content: theDescription },
    { name: "twitter:creator", content: twitter || defaultTwitter },
    { name: "twitter:image:src", content: theImage },
    { property: "og:title", content: theTitle },
    { property: "og:type", content: contentType || "website" },
    { property: "og:url", content: SITE_URL + pathname },
    { property: "og:image", content: theImage },
    { property: "og:description", content: theDescription },
    { property: "og:site_name", content: defaultTitle },
    { property: "fb:app_id", content: FACEBOOK_APP_ID }
  ];

  if (noCrawl) {
    metaTags.push({ name: "robots", content: "noindex, nofollow" });
  }

  if (published) {
    metaTags.push({ name: "article:published_time", content: published });
  }
  if (updated) {
    metaTags.push({ name: "article:modified_time", content: updated });
  }
  if (category) {
    metaTags.push({ name: "article:section", content: category });
  }
  if (tags) {
    metaTags.push({ name: "article:tag", content: tags });
  }

  return metaTags;
};

// eslint-disable-next-line
const SEO = ({ schema, pathname, ...rest }) => (
  <Helmet
    htmlAttributes={{
      lang: "fa",
      itemscope: undefined,
      itemtype: `http://schema.org/${schema || "WebPage"}`
    }}
    title={rest.title ? rest.title + defaultSep + defaultTitle : defaultTitle}
    link={[
      {
        rel: "canonical",
        href: SITE_URL + pathname
      }
    ]}
    meta={getMetaTags(rest, pathname)}
  />
);

SEO.propTypes = {
  schema: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  path: PropTypes.string,
  contentType: PropTypes.string,
  published: PropTypes.string,
  updated: PropTypes.string,
  category: PropTypes.string,
  tags: PropTypes.array,
  twitter: PropTypes.string
};

export default SEO;
