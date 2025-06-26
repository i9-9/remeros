import qs from 'qs';

const strapiUrl = process.env.STRAPI_API_URL;

interface FetchOptions {
  path: string;
  urlParamsObject?: object;
  options?: RequestInit;
}

export async function fetchAPI({ path, urlParamsObject = {}, options = {} }: FetchOptions) {
  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject, { encodeValuesOnly: true });
    const requestUrl = `${strapiUrl}/api${path}${queryString ? `?${queryString}` : ''}`;

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}

export async function getProjectImages() {
  try {
    const data = await fetchAPI({
      path: '/project-images',
      urlParamsObject: {
        populate: '*',
      },
    });
    return data;
  } catch (error) {
    console.error('Error fetching project images:', error);
    return null;
  }
}

export async function submitContactForm(formData: any) {
  try {
    const response = await fetchAPI({
      path: '/contact-submissions',
      options: {
        method: 'POST',
        body: JSON.stringify({ data: formData }),
      },
    });
    return response;
  } catch (error) {
    console.error('Error submitting form:', error);
    throw error;
  }
} 