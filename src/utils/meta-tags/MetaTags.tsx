// src/components/MetaTags.js
import { Helmet } from 'react-helmet';

type TMetaTags = {
  title: string;
  description: string;
  imageUrl: string;
};

const MetaTags = ({ title, description, imageUrl }: TMetaTags) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content="Muhammad Azar Nuzy" />
      <meta name="keywords" content="Chatify, Chat, AI Chatbot, Online Chat, Social Chat, Chat with Friends, AI" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={window.location.href} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    </Helmet>
  );
};

export default MetaTags;
