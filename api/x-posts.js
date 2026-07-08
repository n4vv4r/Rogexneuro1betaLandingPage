const FALLBACK_POSTS = [
  {
    id: 'fallback-1',
    text: 'Rogex Laboratories moves as industrial research infrastructure: PRISMA, RogexOS and Moscovium.',
    created_at: 'local',
    url: 'https://x.com/rogexlabs'
  },
  {
    id: 'fallback-2',
    text: 'PRISMA 3 sales will open soon for researchers and qualified people with real scientific interest.',
    created_at: 'local',
    url: 'https://x.com/rogexlabs'
  },
  {
    id: 'fallback-3',
    text: 'Moscovium will connect SDR, spectrum and reproducible experiments with PRISMA.',
    created_at: 'local',
    url: 'https://x.com/rogexlabs'
  }
];

function sendJson(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  res.end(JSON.stringify(payload));
}

function mapPosts(posts) {
  return posts.map((post) => ({
    id: post.id,
    text: post.text,
    created_at: post.created_at,
    url: `https://x.com/rogexlabs/status/${post.id}`,
    metrics: post.public_metrics || null
  }));
}

export default async function handler(req, res) {
  const token = process.env.X_BEARER_TOKEN;
  const username = process.env.X_USERNAME || 'rogexlabs';
  let userId = process.env.X_USER_ID;

  if (!token) {
    return sendJson(res, 200, {
      source: 'fallback',
      reason: 'missing_x_bearer_token',
      posts: FALLBACK_POSTS
    });
  }

  try {
    if (!userId) {
      const userUrl = new URL(`https://api.x.com/2/users/by/username/${username}`);
      userUrl.searchParams.set('user.fields', 'id,name,username,profile_image_url,verified');

      const userResponse = await fetch(userUrl, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!userResponse.ok) {
        throw new Error(`x_user_lookup_failed_${userResponse.status}`);
      }

      const userPayload = await userResponse.json();
      userId = userPayload?.data?.id;

      if (!userId) {
        throw new Error('x_user_id_missing');
      }
    }

    const postsUrl = new URL(`https://api.x.com/2/users/${userId}/tweets`);
    postsUrl.searchParams.set('max_results', '5');
    postsUrl.searchParams.set('exclude', 'replies,retweets');
    postsUrl.searchParams.set('tweet.fields', 'created_at,public_metrics,lang');

    const postsResponse = await fetch(postsUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!postsResponse.ok) {
      throw new Error(`x_posts_failed_${postsResponse.status}`);
    }

    const postsPayload = await postsResponse.json();
    const posts = mapPosts(postsPayload?.data || []);

    return sendJson(res, 200, {
      source: 'x-api',
      username,
      posts: posts.length ? posts : FALLBACK_POSTS
    });
  } catch (error) {
    return sendJson(res, 200, {
      source: 'fallback',
      reason: String(error?.message || error),
      posts: FALLBACK_POSTS
    });
  }
}
