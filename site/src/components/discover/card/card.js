import React from 'react';
import Img from 'gatsby-image';

import styles from './card.module.scss';

export const Card = ({feed}) => {
  return (
    <a href={feed.data.url} rel="noopener noreferrer" aria-label={feed.data.title}>
      <figure className={styles.figure}>
        <Img fluid={feed.remoteImage.childImageSharp.fluid} alt={feed.data.title} />
      </figure>
    </a>
  );
};
