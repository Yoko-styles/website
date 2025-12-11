import Image from "next/image";
import NavbarClient from "./components/NavbarClient";
import BetaSignup from "./components/BetaSignup";
import Carousel3D from "./components/Carousel3D";
import Card from "./components/Card";

export default function Home() {
  return (
    <>
      <NavbarClient />
      <main>
        <section className="relative w-full h-screen overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
          />

          <div className="relative z-10 flex items-center justify-center w-full h-full">
            <div className="text-center px-6">
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold text-white leading-tight drop-shadow-md">Reinventing Fashion Design with AI</h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mt-4 max-w-3xl mx-auto">Generate production-ready sewing patterns instantly from text, images, or CAD files.</p>
            </div>
          </div>
        </section>
        <section id="ai" className="py-16 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Our AI Solution</h2>
                <p className="text-lg text-gray-700 mb-6">YOKO Styles converts ideas into production-ready patterns using multimodal AI trained on expert datasets. Faster iterations, fewer samples, and consistent sizing—designed for teams and factories.</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Pattern creation</div>
                    <div className="mt-1 text-xl font-semibold text-black">Seconds</div>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Development cycle</div>
                    <div className="mt-1 text-xl font-semibold text-black">Minutes</div>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Sampling cost</div>
                    <div className="mt-1 text-xl font-semibold text-black">80% less</div>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Expert dependency</div>
                    <div className="mt-1 text-xl font-semibold text-black">Optional</div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <a href="#beta-email" className="inline-block bg-black text-white px-5 py-2 rounded-md font-semibold">Join Beta</a>
                  <a href="#why" className="text-sm text-gray-600 hover:underline">Learn how it works</a>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <div className="w-full rounded-lg overflow-hidden shadow-md">
                  <img src="/section_1/ai.jpg" alt="Why YOKO Styles matters" className="w-full h-64 object-cover md:h-80" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="why" className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">


              <div className="order-last md:order-first">
                <div className="aspect-w-4 aspect-h-3 flex items-center justify-center">
                  <img src="/section_2/why_yoko_styles.jpg" alt="illustration" className="w-3/4 opacity-90 rounded" />
                </div>
              </div>

              <div className="order-first md:order-last">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 ">Why YOKO Styles?</h2>
                <p className="text-lg text-gray-700 mb-6">Fashion design is stuck in the past — weeks of manual drafting, costly iterations, and limited scalability. We streamline the entire design-to-production flow so teams can move faster and with more confidence.</p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-md bg-black text-white flex items-center justify-center font-semibold">1</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Speed</h3>
                      <p className="text-gray-600">Turn ideas into production-ready patterns in minutes, not weeks.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-md bg-black text-white flex items-center justify-center font-semibold">2</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Precision</h3>
                      <p className="text-gray-600">AI-driven pattern generation reduces manual errors and ensures consistent sizing across runs.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-md bg-black text-white flex items-center justify-center font-semibold">3</div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Scalability</h3>
                      <p className="text-gray-600">Automate repetitive tasks so your team can focus on creativity and growth.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <a href="#" className="inline-block bg-black text-white px-5 py-2 rounded-md font-semibold">Get started</a>
                  <a href="#" className="inline-block border border-gray-300 text-gray-900 px-4 py-2 rounded-md">Contact sales</a>
                </div>
              </div>

            </div>
          </div>
        </section>

        <section id="capabilities" className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">With YOKO Styles, <br /> you can</h2>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
              <li className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-medium">✓</span>
                <span>Generate sewing patterns in seconds, not weeks</span>
              </li>

              <li className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-medium">✓</span>
                <span>Use text, images, or CAD as input</span>
              </li>

              <li className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-medium">✓</span>
                <span>Fit garments across 50+ body types instantly</span>
              </li>

              <li className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-medium">✓</span>
                <span>Export ready-to-manufacture DXF patterns</span>
              </li>

              <li className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-medium">✓</span>
                <span>Preview garments in 3D</span>
              </li>
            </ul>
          </div>
        </section>

        <section id="who" className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Who Is It For?</h2>

            <div className="items-center">
              <div>
                <Carousel3D
                  cards={[
                    {
                      key: "designers",
                      image: "/section_4/designers.jpg",
                      title: "Designers & Brands",
                      subtitle: "Speed up design cycles by 80%",
                      panelText: "Prototype, iterate, and move designs to production faster. YOKO Styles turns concepts into manufacturable patterns with consistent sizing and version control so teams can collaborate without rework.",
                      details: [
                        "Generate production-ready patterns from sketches, images or text prompts",
                        "Maintain versioned pattern history for collaboration",
                        "Export DXF and graded sizes ready for factories",
                      ],
                    },
                    {
                      key: "manufacturers",
                      image: "/section_4/manufacturers.jpg",
                      title: "Manufacturers",
                      subtitle: "Scale production with less cost",
                      panelText: "Reduce sampling cycles and manual rework by consuming AI-validated patterns that adhere to factory constraints. Integrate pattern outputs into your production pipeline to cut lead times and costs.",
                      details: [
                        "Cut sampling iterations and cost with more accurate first samples",
                        "Automatically apply factory grading and marker optimization",
                        "Integrate outputs into PLM and production systems",
                      ],
                    },
                    {
                      key: "platforms",
                      image: "/section_4/tech.jpg",
                      title: "Fashion Tech Platforms",
                      subtitle: "Integrate via API/SDK",
                      panelText: "Add pattern-generation as a service to your product using our API or SDK. Deliver instant value to your users by embedding AI-driven pattern tools directly into their workflows.",
                      details: [
                        "Simple REST API and SDKs for frontend & backend integration",
                        "White-labelable outputs and developer-friendly tooling",
                        "Scalable cloud infrastructure with predictable latency",
                      ],
                    },
                    {
                      key: "students",
                      image: "/section_4/student.jpg",
                      title: "Students & Freelancers",
                      subtitle: "Create without limits",
                      panelText: "Learn faster and produce portfolio-ready work without expensive tooling. YOKO Styles provides templates, automated grading, and guided pattern generation so creators can bring ideas to reality.",
                      details: [
                        "Access templates and learning-focused workflows",
                        "Generate and export patterns for practice and portfolios",
                        "Affordable tools for independent creators",
                      ],
                    },
                    {
                      key: "pattern-makers",
                      image: "/section_4/pattern-makers.jpg",
                      title: "Pattern Makers",
                      subtitle: "Create accurate, manufacturable patterns faster",
                      panelText: "Boost throughput with AI-assisted drafting that respects grading rules and factory tolerances. YOKO Styles helps pattern makers produce consistent, ready-for-production patterns and scale their output.",
                      details: [
                        "AI-assisted drafting that preserves expert constraints",
                        "Automated grading across size ranges with factory rules",
                        "Export ready-to-manufacture files and quality checks",
                      ],
                    },
                  ]}
                  height="560px"
                  width="100%"
                  offset={2}
                  showArrows={true}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="access" className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">Two Ways to Access</h2>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">Full Design App</div>
                <div className="mt-2 text-lg font-semibold text-gray-900">End-to-end creative tools</div>
                <p className="mt-2 text-sm text-gray-600">Design, grade, and export production-ready patterns with collaboration tools built in.</p>
                <div className="mt-4">
                  <a href="#beta-email" className="inline-block bg-black text-white px-4 py-2 rounded-md text-sm font-semibold">Join App Beta</a>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">Developer API & SDK</div>
                <div className="mt-2 text-lg font-semibold text-gray-900">Embed pattern generation</div>
                <p className="mt-2 text-sm text-gray-600">REST APIs and SDKs to add AI-driven pattern tools into your product.</p>
                <div className="mt-4">
                  <a href="#beta-email" className="inline-block border border-gray-300 text-gray-900 px-4 py-2 rounded-md text-sm font-semibold">Join App Beta</a>
                </div>
              </div>
            </div>

            {/* (removed duplicate beta panels) */}

          
              {/* Beta access benefits + signup with right-side image on md+ screens */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-2 space-y-6">
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Beta Access Benefits</h3>
                    <ul className="list-disc pl-5 text-gray-700 space-y-2">
                      <li>Exclusive early access before public launch</li>
                      <li>Influence product features with direct feedback</li>
                      <li>Special pricing for founding users</li>
                    </ul>
                    <p className="mt-4 text-sm text-gray-600">Be among the first to shape the future of fashion design.</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Join Beta Waitlist</h3>
                    <p className="text-sm text-gray-700 mb-4">Get early access to YOKO Styles and shape the future of AI-driven pattern generation</p>

                    {/* Use existing BetaSignup component if available, otherwise inline simple form */}
                    <div>
                      <BetaSignup />
                    </div>

                  </div>
                </div>

                <div className="flex items-center justify-center h-full">
                  <div className="w-full rounded-lg overflow-hidden shadow-md h-full">
                    <Image
                      src="/section_5/aeroplane.jpg"
                      alt="Access illustration"
                      width={1200}
                      height={384}
                      className="w-full h-64 object-cover md:h-full"
                    />
                  </div>
                </div>
              </div>
          </div>


        </section>



      </main>

      <footer className="bg-gray-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-400">
          <div>© {new Date().getFullYear()} YOKO Styles — All rights reserved.</div>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
          </div>
        </div>
      </footer>
    </>
  );
}
