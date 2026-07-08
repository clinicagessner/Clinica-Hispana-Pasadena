import { unstable_cache } from "next/cache";
import { GOOGLE_REVIEWS_DATA } from "@/lib/constants";

export interface GoogleReview {
  author: string;
  rating: number;
  text: string;
  relativeTime?: string;
  photoUrl?: string;
}

export interface GooglePlaceData {
  averageRating: number;
  totalReviews: number;
  reviews: GoogleReview[];
}

const FALLBACK: GooglePlaceData = {
  averageRating: GOOGLE_REVIEWS_DATA.averageRating,
  totalReviews: GOOGLE_REVIEWS_DATA.totalReviews,
  reviews: [],
};

/**
 * Trae rating + reseñas recientes de Google Places API (New).
 * Cacheado 1h con unstable_cache. Fallback a GOOGLE_REVIEWS_DATA si no
 * hay API key o la petición falla. La key vive solo en .env (server-side).
 */
async function fetchGooglePlaceData(): Promise<GooglePlaceData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!apiKey || !placeId) return FALLBACK;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews",
          "Accept-Language": "es",
        },
        // unstable_cache maneja el cacheo; evitamos doble caché de fetch.
        cache: "no-store",
      },
    );
    if (!res.ok) return FALLBACK;
    const data = (await res.json()) as {
      rating?: number;
      userRatingCount?: number;
      reviews?: Array<{
        rating?: number;
        text?: { text?: string };
        originalText?: { text?: string };
        authorAttribution?: { displayName?: string; photoUri?: string };
        relativePublishTimeDescription?: string;
      }>;
    };

    const reviews: GoogleReview[] = (data.reviews ?? [])
      .filter((r) => (r.rating ?? 0) >= 5)
      .slice(0, 5)
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? "Google",
        rating: r.rating ?? 5,
        text: r.text?.text ?? r.originalText?.text ?? "",
        relativeTime: r.relativePublishTimeDescription,
        photoUrl: r.authorAttribution?.photoUri,
      }))
      .filter((r) => r.text.length > 0);

    return {
      averageRating: data.rating ?? FALLBACK.averageRating,
      totalReviews: data.userRatingCount ?? FALLBACK.totalReviews,
      reviews,
    };
  } catch {
    return FALLBACK;
  }
}

export const getGooglePlaceData = unstable_cache(
  fetchGooglePlaceData,
  ["google-place-data"],
  { revalidate: 604800, tags: ["google-place-data"] },
);
