// function Home() {
//   return (
//     <div className="text-center mt-20">
//       <h1 className="text-5xl font-bold text-blue-600">
//         Find Your Dream Job
//       </h1>

//       <p className="mt-4 text-gray-600 text-lg">
//         Search jobs from top companies.
//       </p>
//     </div>
//   )
// }

// export default Home



import { 
  MagnifyingGlassIcon, 
  BriefcaseIcon, 
  UserGroupIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="glass-card p-12 md:p-20 shadow-2xl shadow-black/10 mx-auto max-w-5xl">
            <div className="w-28 h-28 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-indigo-500/50">
              <BriefcaseIcon className="w-14 h-14 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 bg-clip-text text-transparent mb-8 leading-tight">
              Find Your <span className="bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">Dream Job</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover thousands of top companies hiring developers, designers, and professionals. 
              Your next career move starts here.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="glass-card p-1 rounded-3xl shadow-2xl shadow-black/10 mb-8">
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Search jobs, companies, or keywords..."
                    className="
                      flex-1 px-6 py-5 bg-transparent outline-none text-lg placeholder-gray-500
                      rounded-3xl backdrop-blur-sm bg-white/60
                    "
                  />
                  <button className="
                    px-8 py-5 bg-gradient-to-r from-indigo-500 to-blue-600 text-white 
                    font-bold text-lg rounded-3xl shadow-2xl shadow-indigo-500/40
                    hover:from-indigo-600 hover:to-blue-700 hover:shadow-3xl hover:shadow-indigo-500/60
                    transition-all duration-300 ml-1 whitespace-nowrap
                  ">
                    <MagnifyingGlassIcon className="w-6 h-6 inline mr-2" />
                    Search Jobs
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">10K+</div>
                <p className="text-xl text-gray-700 font-semibold">Jobs Posted</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">5K+</div>
                <p className="text-xl text-gray-700 font-semibold">Companies</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">50K+</div>
                <p className="text-xl text-gray-700 font-semibold">Happy Users</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-indigo-900 bg-clip-text text-transparent mb-6">
              Why Choose JobPortal?
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Trusted by top companies and millions of professionals worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-10 text-center group hover:shadow-3xl hover:shadow-blue-500/30 hover:-translate-y-4 transition-all duration-500">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/40 group-hover:scale-110 transition-transform">
                <BriefcaseIcon className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Jobs</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Access exclusive job listings from top-tier companies that aren't posted anywhere else.
              </p>
            </div>

            <div className="glass-card p-10 text-center group hover:shadow-3xl hover:shadow-emerald-500/30 hover:-translate-y-4 transition-all duration-500">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/40 group-hover:scale-110 transition-transform">
                <UserGroupIcon className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Matching</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                AI-powered job recommendations based on your skills, experience, and preferences.
              </p>
            </div>

            <div className="glass-card p-10 text-center group hover:shadow-3xl hover:shadow-purple-500/30 hover:-translate-y-4 transition-all duration-500">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-purple-500/40 group-hover:scale-110 transition-transform">
                <ArrowRightIcon className="w-9 h-9 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Fast Application</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                One-click apply with your complete profile. Get responses within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-indigo-900/20 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12 md:p-16 shadow-2xl shadow-black/20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to start your journey?
            </h2>
            <p className="text-xl text-indigo-100 mb-12 max-w-2xl mx-auto">
              Join 50K+ professionals who found their dream jobs through JobPortal
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="
                px-12 py-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white 
                font-bold text-xl rounded-3xl shadow-2xl shadow-emerald-500/50
                hover:from-emerald-600 hover:to-green-700 hover:shadow-3xl hover:shadow-emerald-500/70
                hover:scale-105 transition-all duration-300
              ">
                Find Jobs Now
              </button>
              <button className="
                px-12 py-6 backdrop-blur-xl bg-white/20 text-white font-bold text-xl 
                rounded-3xl shadow-xl shadow-white/20 border border-white/30
                hover:bg-white/40 hover:shadow-2xl hover:shadow-white/40
                hover:scale-105 transition-all duration-300
              ">
                For Employers
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;