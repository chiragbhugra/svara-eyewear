import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import { useUserStore } from '../stores/userStore'

export default function Account() {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const user = useUserStore(state => state.user)

  useEffect(() => {
    if (user) {
      getProfile()
    }
  }, [user])

  async function getProfile() {
    setLoading(true);
    // Simulate fetching profile data
    setUsername(user.email);
    setWebsite('');
    setAvatarUrl('');
    setLoading(false);
  }

  async function updateProfile({ username, website, avatar_url }) {
    setLoading(true);
    // Simulate updating profile
    setUsername(username);
    setWebsite(website);
    setAvatarUrl(avatar_url);
    setLoading(false);
  }

  if (!user) {
    return <div>Please sign in to view this page.</div>
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="website"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  )
}
