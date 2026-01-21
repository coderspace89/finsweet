import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksAboutSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_about_sections';
  info: {
    displayName: 'About Block';
  };
  attributes: {
    blockTitle: Schema.Attribute.String;
    cta: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface BlocksAuthorCard extends Struct.ComponentSchema {
  collectionName: 'components_blocks_author_cards';
  info: {
    displayName: 'Author Card';
  };
  attributes: {
    image: Schema.Attribute.Media<'images', true>;
    name: Schema.Attribute.String;
    role: Schema.Attribute.String;
    socialLinks: Schema.Attribute.JSON &
      Schema.Attribute.DefaultTo<{
        facebook: {
          icon: 'facebook-f';
          url: '';
        };
        instagram: {
          icon: 'instagram';
          url: '';
        };
        linkedin: {
          icon: 'linkedin-in';
          url: '';
        };
        twitter: {
          icon: 'twitter';
          url: '';
        };
      }>;
  };
}

export interface BlocksAuthorsList extends Struct.ComponentSchema {
  collectionName: 'components_blocks_authors_lists';
  info: {
    displayName: 'Authors List';
  };
  attributes: {
    authors: Schema.Attribute.Component<'blocks.author-card', true>;
  };
}

export interface BlocksCategorySection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_category_sections';
  info: {
    displayName: 'Category Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    isHighlighted: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksDiscoverSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_discover_sections';
  info: {
    displayName: 'Discover Section';
  };
  attributes: {
    blockTitle: Schema.Attribute.String;
    buttonLink: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_hero_sections';
  info: {
    displayName: 'Hero Section';
  };
  attributes: {
    author: Schema.Attribute.String;
    buttonText: Schema.Attribute.String;
    categoryText: Schema.Attribute.String;
    dateText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    headline: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface BlocksLogosBlock extends Struct.ComponentSchema {
  collectionName: 'components_blocks_logos_blocks';
  info: {
    displayName: 'Logos Block';
  };
  attributes: {
    logoImages: Schema.Attribute.Component<'elements.logo-image', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksMissionBlock extends Struct.ComponentSchema {
  collectionName: 'components_blocks_mission_blocks';
  info: {
    displayName: 'Mission Block';
  };
  attributes: {
    blockTitle: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface BlocksTestimonialsSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_testimonials_sections';
  info: {
    displayName: 'Testimonials Section';
  };
  attributes: {
    blockTitle: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    Testimonials: Schema.Attribute.Component<'elements.testimonial', true>;
    title: Schema.Attribute.String;
  };
}

export interface ElementsLinks extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'links';
  };
  attributes: {
    href: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    text: Schema.Attribute.String;
  };
}

export interface ElementsLogo extends Struct.ComponentSchema {
  collectionName: 'components_elements_logos';
  info: {
    displayName: 'logo';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    logoText: Schema.Attribute.String;
  };
}

export interface ElementsLogoImage extends Struct.ComponentSchema {
  collectionName: 'components_elements_logo_images';
  info: {
    displayName: 'Logo Image';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface ElementsTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_elements_testimonials';
  info: {
    displayName: 'Testimonial';
  };
  attributes: {
    authorLocation: Schema.Attribute.String;
    authorName: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    quote: Schema.Attribute.Text;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'Header';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.links', true>;
    logo: Schema.Attribute.Component<'elements.logo', false>;
    navigation: Schema.Attribute.Component<'elements.links', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.about-section': BlocksAboutSection;
      'blocks.author-card': BlocksAuthorCard;
      'blocks.authors-list': BlocksAuthorsList;
      'blocks.category-section': BlocksCategorySection;
      'blocks.discover-section': BlocksDiscoverSection;
      'blocks.hero-section': BlocksHeroSection;
      'blocks.logos-block': BlocksLogosBlock;
      'blocks.mission-block': BlocksMissionBlock;
      'blocks.testimonials-section': BlocksTestimonialsSection;
      'elements.links': ElementsLinks;
      'elements.logo': ElementsLogo;
      'elements.logo-image': ElementsLogoImage;
      'elements.testimonial': ElementsTestimonial;
      'layout.header': LayoutHeader;
    }
  }
}
