export interface ContentfulAsset {
  sys: {
    id: string;
  };
  fields: {
    title: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

export interface ProjectImages {
  sys: {
    id: string;
    contentType: {
      sys: {
        id: string;
      };
    };
  };
  fields: {
    heroImage: ContentfulAsset;
    locationImage: ContentfulAsset;
    environmentImage: ContentfulAsset;
    amenitiesImage: ContentfulAsset;
    projectImage: ContentfulAsset;
    interiorImages: ContentfulAsset[];
    constructionVideo: ContentfulAsset;
  };
} 