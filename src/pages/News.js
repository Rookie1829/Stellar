import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';

function News() {
    const [news, setNews] = useState([]);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('https://api.spaceflightnewsapi.net/v3/articles');
            const sortedNews = response.data.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
            setNews(sortedNews);
        }
        fetchData();

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    function formatDate(dateString) {
      if (!dateString) return "Date not provided";
      const date = new Date(dateString);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString();
      } else {
        return "Date invalid";
      }
    }

    return (
        <div className="bg-space-gradient min-h-screen text-white p-6">
        <h1 className="text-4xl mb-6 font-bold text-center">
                News
            </h1>
            <div className="px-12 md:px-24 pl-10 pr-10">
                <Splide
                    options={{
                        rewind: true,
                        gap: '1rem',
                        pagination: true,
                        perPage: 3,
                        focus: 1,
                        omitEnd: true,
                        arrows: !isMobile,
                        breakpoints: {
                            762: {
                                perPage: 1,
                                focus: 'center',
                                arrows: false,
                            },
                        },
                    }}
                >
                    {news.map((article) => (
             <SplideSlide className={`pb-20 ${isMobile ? '' : 'pl-16 pr-16'}`} key={article.id}>
             <div className={`space-y-5 px-4 w-full h-auto ${isMobile ? '' : 'md:h-120'}`}>
                 <span className="bg-red-500 text-white p-2 rounded">{formatDate(article.publishedAt)}</span>
                 <h2 className="text-2xl font-bold">{article.title}</h2>
                 <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover my-3"/>
                 <p className="text-gray-500 overflow-y-flex h-30">{article.summary}</p>
                 <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Read more</a>
             </div>
         </SplideSlide>         
                    ))}
                </Splide>
                
                
            </div>
        </div>
    );
}

export default News;
