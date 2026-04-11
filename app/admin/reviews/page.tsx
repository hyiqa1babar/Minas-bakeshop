'use client';

import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin-sidebar';
import { createClient } from '@/utils/supabase/client';
import StarRating from '@/components/star-rating';
import { Check, X, Trash2 } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  rating: number;
  review_text: string;
  status: string;
  created_at: string;
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const loadReviews = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) {
       setReviews(data as Review[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    // Optimistic UI update
    setReviews(reviews.map(r => r.id === id ? { ...r, status: newStatus } : r));
    await supabase.from('reviews').update({ status: newStatus }).eq('id', id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Permanently delete this review?')) return;
    setReviews(reviews.filter(r => r.id !== id));
    await supabase.from('reviews').delete().eq('id', id);
  };

  return (
    <div className="min-h-screen bg-[#F0E8DF]/20">
      <AdminSidebar activeTab="reviews" />
      
      <div className="ml-64 pt-20 px-8 py-8">
        <div className="max-w-6xl">
          <div className="mb-8">
            <h1 className="text-4xl font-serif text-[#2C2C2C]">Moderation Queue</h1>
            <p className="text-[#98898D] mt-2">Approve customer reviews before they appear publicly.</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-[#FAC1B5]/20 overflow-hidden">
             {loading ? (
                <div className="p-12 text-center text-[#98898D]">Loading Reviews...</div>
             ) : (
                <div className="divide-y divide-[#FAC1B5]/20">
                  {reviews.map((review) => (
                    <div key={review.id} className={`p-6 flex flex-col md:flex-row gap-6 items-start md:items-center transition-colors ${review.status === 'pending' ? 'bg-[#F283AE]/5' : 'hover:bg-[#F0E8DF]/20'}`}>
                       <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                             <h3 className="font-semibold text-[#2C2C2C]">{review.name}</h3>
                             <span className="text-xs text-[#98898D]">
                               {new Date(review.created_at).toLocaleDateString()}
                             </span>
                             <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                               review.status === 'approved' ? 'bg-green-100 text-green-700' :
                               review.status === 'rejected' ? 'bg-red-100 text-red-700' :
                               'bg-yellow-100 text-yellow-700'
                             }`}>
                                {review.status.toUpperCase()}
                             </span>
                          </div>
                          <div className="mb-3">
                             <StarRating value={review.rating} onChange={()=>{}} interactive={false} size="sm" />
                          </div>
                          <p className="text-[#2C2C2C] text-sm leading-relaxed">{review.review_text}</p>
                       </div>
                       
                       <div className="flex gap-2 shrink-0 border-t md:border-t-0 md:border-l border-[#FAC1B5]/20 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
                          {review.status !== 'approved' && (
                            <button onClick={() => handleUpdateStatus(review.id, 'approved')} className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-semibold transition-colors">
                              <Check size={16} /> Approve
                            </button>
                          )}
                          {review.status !== 'rejected' && review.status !== 'pending' && (
                             <button onClick={() => handleUpdateStatus(review.id, 'rejected')} className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-semibold transition-colors">
                               <X size={16} /> Hide
                             </button>
                          )}
                          <button onClick={() => handleDelete(review.id)} className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-500 hover:bg-red-50 rounded-lg text-sm font-semibold transition-colors ml-auto md:ml-0">
                             <Trash2 size={16} /> Delete
                          </button>
                       </div>
                    </div>
                  ))}
                  
                  {reviews.length === 0 && (
                     <div className="p-12 text-center text-[#98898D]">No reviews completely empty.</div>
                  )}
                </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
