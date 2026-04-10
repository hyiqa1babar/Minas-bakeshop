'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import StarRating from './star-rating';
import { supabase } from '@/lib/supabase';

interface Review {
  id: string;
  name: string;
  date: string;
  rating: number;
  text: string;
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    review: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    async function loadReviews() {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        if (data) {
          setReviews(data.map(d => ({
            id: d.id,
            name: d.name,
            rating: d.rating,
            text: d.review_text,
            date: new Date(d.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
          })));
        }
      } catch (err) {
        console.error('Failed to load reviews:', err);
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (isAutoPlaying && reviews.length > 0) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, reviews.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim() && formData.review.trim() && formData.rating > 0) {
      setSubmitStatus('submitting');
      try {
        const { error } = await supabase
          .from('reviews')
          .insert([
            {
              name: formData.name,
              rating: formData.rating,
              review_text: formData.review,
              status: 'pending' // Moderated queue
            }
          ]);
          
        if (error) throw error;
        
        setSubmitStatus('success');
        setFormData({ name: '', rating: 0, review: '' });
        
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } catch(err) {
        console.error('Failed to post review:', err);
        setSubmitStatus('error');
      }
    }
  };

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 bg-gradient-to-b from-[#FDF8F5] to-[#F8E8E0]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-[#2C2C2C] mb-4">
            What Our Customers Say
          </h2>
          <p className="text-[#98898D] max-w-xl mx-auto">
            Real reviews from our lovely customers who trusted us with their special moments
          </p>
        </div>

        {/* Featured Review Carousel */}
        <div className="relative mb-12">
          {loading ? (
            <div className="bg-white rounded-3xl shadow-lg border border-[#FAC1B5]/20 p-8 py-24 text-center">
              <p className="text-[#F283AE] font-semibold animate-pulse">Loading reviews...</p>
            </div>
          ) : reviews.length > 0 ? (
            <>
              <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-[#FAC1B5]/20 p-8 md:p-12">
                <Quote className="w-10 h-10 text-[#FAC1B5] mb-6" />
                
                <div className="mb-4">
                  <StarRating value={reviews[currentIndex].rating} onChange={() => {}} interactive={false} size="md" showNumber={true} />
                </div>
                
                <p className="text-[#2C2C2C] text-lg leading-relaxed mb-6">
                  {reviews[currentIndex].text}
                </p>
                
                <div className="flex items-center justify-between">
                  <p className="text-[#F283AE] font-semibold">
                    - {reviews[currentIndex].name}
                  </p>
                  <p className="text-sm text-[#98898D]">{reviews[currentIndex].date}</p>
                </div>
              </div>

              <button
                onClick={goToPrevious}
                className="absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-[#FDF8F5] transition-colors z-10"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-6 h-6 text-[#2C2C2C]" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-[#FDF8F5] transition-colors z-10"
                aria-label="Next review"
              >
                <ChevronRight className="w-6 h-6 text-[#2C2C2C]" />
              </button>

              <div className="flex justify-center flex-wrap gap-2 mt-6">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrentIndex(index);
                    }}
                    className={`h-2.5 rounded-full transition-all ${
                      index === currentIndex
                        ? 'bg-[#F283AE] w-8'
                        : 'bg-[#FAC1B5]/40 w-2.5 hover:bg-[#FAC1B5]'
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-3xl shadow-lg border border-[#FAC1B5]/20 p-8 text-center text-[#98898D]">
              No reviews available yet.
            </div>
          )}
        </div>

        {/* Review Form */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#FAC1B5]/20">
          <h3 className="text-xl font-semibold text-[#2C2C2C] mb-6">
            Share Your Experience
          </h3>
          {submitStatus === 'success' ? (
            <div className="bg-[#C6C870]/20 text-[#2C2C2C] p-6 rounded-xl text-center">
              <p className="font-semibold text-lg text-[#C6C870] mb-2">Thank you!</p>
              <p>Your review has been submitted successfully and is pending approval.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitStatus === 'error' && (
                <div className="bg-red-100 text-red-700 p-3 rounded-lg text-sm">
                  Failed to submit review. Please try again later.
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-[#FAC1B5]/30 rounded-lg focus:outline-none focus:border-[#F283AE]"
                  required
                  disabled={submitStatus === 'submitting'}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-3">Rating</label>
                <StarRating 
                  value={formData.rating} 
                  onChange={(rating) => setFormData({ ...formData, rating })}
                  interactive={submitStatus !== 'submitting'}
                  size="lg"
                  showNumber={true}
                />
              </div>
              <textarea
                placeholder="Tell us about your experience..."
                value={formData.review}
                onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                className="w-full px-4 py-3 border border-[#FAC1B5]/30 rounded-lg focus:outline-none focus:border-[#F283AE] resize-none h-24"
                required
                disabled={submitStatus === 'submitting'}
              />
              <button
                type="submit"
                disabled={submitStatus === 'submitting' || formData.rating === 0}
                className="w-full bg-[#F283AE] hover:bg-[#E86FA3] disabled:opacity-50 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                {submitStatus === 'submitting' ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
