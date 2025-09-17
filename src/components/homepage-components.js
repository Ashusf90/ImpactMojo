import React, { useEffect } from 'react';

// ===================================================================================
// --- DATA: The necessary data is now included directly in this file. ---
// This removes the import that was causing the error.
// ===================================================================================

const courseData = [
    { id: "development-economics-101", title: "Development Economics 101", description: "Foundational concepts in development economics, including poverty, inequality, and growth.", url: "https://101.www.impactmojo.in/development-economics-101", category: "Policy & Economics", difficulty: "Beginner" },
    { id: "qualitative-research-methods-101", title: "Qualitative Research Methods 101", description: "An introduction to qualitative research methodologies like ethnography, case studies, and interviews.", url: "https://101.www.impactmojo.in/qualitative-research-methods-101", category: "Research Methods", difficulty: "Beginner" },
    { id: "data-literacy-101", title: "Data Literacy 101", description: "Learn to read, interpret, and communicate data effectively in the development sector.", url: "https://101.www.impactmojo.in/data-literacy-101", category: "Data Analysis", difficulty: "Beginner" },
    { id: "gender-studies-101", title: "Gender Studies 101", description: "Explore key concepts in gender, including social construction, intersectionality, and feminist theories.", url: "https://101.www.impactmojo.in/gender-studies-101", category: "Gender Studies", difficulty: "Beginner" },
];

const testimonialsData = [
    { id: "T1", name: "Priya Sharma", role: "NGO Program Manager", testimonial: "ImpactMojo's courses on MEL have been a game-changer for our projects. The practical insights and real-world case studies are invaluable.", avatar: "/assets/avatars/priya-sharma.jpg" },
    { id: "T2", name: "Arjun Singh", role: "Policy Analyst", testimonial: "The Development Economics 101 course provided a clear and concise overview of complex topics. The platform is user-friendly and the content is top-notch.", avatar: "/assets/avatars/arjun-singh.jpg" },
];

const featuredContentData = [
    { id: "FC1", type: "Article", title: "The Future of AI in Development", description: "An in-depth look at how artificial intelligence is shaping social impact projects.", link: "#" },
    { id: "FC2", type: "Webinar", title: "Participatory Research Methods", description: "Watch our expert panel discuss best practices for community-led research.", link: "#" },
];

// Additional data arrays that might be needed (empty as placeholders)
const labsData = [];
const learningTracks = [];
const resourcesData = [];
const upcomingCourses = [];

// ===================================================================================
// --- HELPER FUNCTION: Safe array mapping ---
// ===================================================================================
const safeMap = (array, mapFunction) => {
    return (array ?? []).map(mapFunction);
};

// ===================================================================================
// --- COMPONENTS: These components now use the data defined above with safety checks. ---
// ===================================================================================

export const PopularCoursesSection = () => {
    // Slice safely with null check
    const popularCourses = (courseData ?? []).slice(0, 3);
    
    // Debug logging to check data availability
    useEffect(() => {
        console.log('PopularCoursesSection - Data check:', {
            courseData: !!courseData,
            popularCourses: popularCourses.length
        });
    }, []);
    
    return (
        <div className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">Popular Courses</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {(popularCourses ?? []).map(course => (
                        <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
                            <a href={course.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Learn More &rarr;</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const TestimonialsSection = () => {
    // Debug logging to check data availability
    useEffect(() => {
        console.log('TestimonialsSection - Data check:', {
            testimonialsData: !!testimonialsData,
            count: (testimonialsData ?? []).length
        });
    }, []);
    
    return (
        <div className="bg-gray-50 dark:bg-gray-800 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">What Our Learners Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {(testimonialsData ?? []).map(t => (
                        <div key={t.id} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
                            <p className="text-gray-600 dark:text-gray-300 italic mb-4">"{t.testimonial}"</p>
                            <div className="flex items-center">
                                <img 
                                    className="h-12 w-12 rounded-full object-cover mr-4" 
                                    src={t.avatar} 
                                    alt={t.name} 
                                    onError={(e) => { e.target.src = 'https://placehold.co/48x48/EBF4FF/76A9FA?text=IM'; }} 
                                />
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-white">{t.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const FeaturedContentSection = () => {
    // Debug logging to check data availability
    useEffect(() => {
        console.log('FeaturedContentSection - Data check:', {
            featuredContentData: !!featuredContentData,
            count: (featuredContentData ?? []).length
        });
    }, []);
    
    return (
        <div className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">Featured Content</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {(featuredContentData ?? []).map(item => (
                        <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{item.type}</span>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white my-2">{item.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                            <a href={item.link} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Read More &rarr;</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ===================================================================================
// --- ADDITIONAL SAFE COMPONENTS: In case you need these later ---
// ===================================================================================

export const UpcomingCoursesSection = () => {
    useEffect(() => {
        console.log('UpcomingCoursesSection - Data check:', {
            upcomingCourses: !!upcomingCourses,
            count: (upcomingCourses ?? []).length
        });
    }, []);
    
    if (!upcomingCourses || upcomingCourses.length === 0) {
        return null; // Don't render if no data
    }
    
    return (
        <div className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">Coming Soon</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {(upcomingCourses ?? []).map(course => (
                        <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 opacity-75">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
                            <span className="text-amber-600 dark:text-amber-400 font-semibold">Coming Soon!</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const LabsSection = () => {
    useEffect(() => {
        console.log('LabsSection - Data check:', {
            labsData: !!labsData,
            count: (labsData ?? []).length
        });
    }, []);
    
    if (!labsData || labsData.length === 0) {
        return null; // Don't render if no data
    }
    
    return (
        <div className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">Interactive Labs</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {(labsData ?? []).map(lab => (
                        <div key={lab.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{lab.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{lab.description}</p>
                            <a href={lab.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Start Lab &rarr;</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const LearningTracksSection = () => {
    useEffect(() => {
        console.log('LearningTracksSection - Data check:', {
            learningTracks: !!learningTracks,
            count: (learningTracks ?? []).length
        });
    }, []);
    
    if (!learningTracks || learningTracks.length === 0) {
        return null; // Don't render if no data
    }
    
    return (
        <div className="bg-gray-50 dark:bg-gray-800 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">Learning Tracks</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {(learningTracks ?? []).map(track => (
                        <div key={track.id} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg text-center">
                            <div className="text-4xl mb-4">{track.icon}</div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{track.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{track.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const ResourcesSection = () => {
    useEffect(() => {
        console.log('ResourcesSection - Data check:', {
            resourcesData: !!resourcesData,
            count: (resourcesData ?? []).length
        });
    }, []);
    
    if (!resourcesData || resourcesData.length === 0) {
        return null; // Don't render if no data
    }
    
    return (
        <div className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-12">Resources & Handouts</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {(resourcesData ?? []).map(resource => (
                        <div key={resource.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{resource.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{resource.description}</p>
                            <div className="flex space-x-4">
                                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Download</a>
                                <button onClick={() => window.print()} className="text-green-600 dark:text-green-400 font-semibold hover:underline">Print PDF</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ===================================================================================
// --- MASTER DEBUG COMPONENT: Use this to check all data at once ---
// ===================================================================================
export const DataDebugComponent = () => {
    useEffect(() => {
        console.log('=== COMPLETE DATA CHECK ===');
        console.log({
            courseData: { exists: !!courseData, count: (courseData ?? []).length },
            testimonialsData: { exists: !!testimonialsData, count: (testimonialsData ?? []).length },
            featuredContentData: { exists: !!featuredContentData, count: (featuredContentData ?? []).length },
            labsData: { exists: !!labsData, count: (labsData ?? []).length },
            learningTracks: { exists: !!learningTracks, count: (learningTracks ?? []).length },
            resourcesData: { exists: !!resourcesData, count: (resourcesData ?? []).length },
            upcomingCourses: { exists: !!upcomingCourses, count: (upcomingCourses ?? []).length }
        });
        console.log('=========================');
    }, []);
    
    return null; // This component only logs, doesn't render anything
};
