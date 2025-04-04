---
layout: "page"
title: "Portfolio"
---

{{< rawhtml >}}
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

<style type="text/tailwindcss">
/* Base styles */
.portfolio-container {
    @apply pt-4 pb-16;
}

/* Title styling */
.portfolio-header {
    @apply mb-12;
}

.portfolio-subtitle {
    @apply text-2xl font-semibold text-primary-light mb-4;
    color: var(--secondary-color);
}

.portfolio-description {
    @apply text-gray-400 max-w-3xl;
}

/* Card styles */
.project-card {
    @apply relative overflow-hidden rounded-xl border border-gray-500/30 transition-all duration-300;
    background: rgba(31, 41, 55, 0.4);
    backdrop-filter: blur(10px);
}

.project-card:hover {
    @apply border-primary transform scale-[1.02];
    box-shadow: 0 0 30px rgba(16, 185, 129, 0.1);
}

.project-image {
    @apply relative overflow-hidden;
    aspect-ratio: 16/9;
}

.project-image img {
    @apply w-full h-full object-cover object-top transition-transform duration-500;
}

.project-card:hover .project-image img {
    @apply scale-110;
}

.project-content {
    @apply p-6 relative z-10;
}

.project-title {
    @apply font-bold text-xl text-gray-200 mb-3 transition-colors duration-300;
}

.project-card:hover .project-title {
    background: linear-gradient(135deg, #10b981 0%, #63bda2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.tag {
    @apply px-3 py-1 text-sm rounded-full transition-all duration-300;
    background: rgba(99, 189, 162, 0.1);
    border: 1px solid rgba(99, 189, 162, 0.2);
    color: #63BDA2;
}

.tag:hover {
    @apply transform -translate-y-1;
    background: linear-gradient(135deg, #10b981 0%, #63bda2 100%);
    color: white;
    border-color: transparent;
}

.project-overlay {
    @apply absolute inset-0 opacity-0 transition-opacity duration-300;
    background: linear-gradient(to bottom, rgba(16, 185, 129, 0.1), rgba(99, 189, 162, 0.05));
}

.project-card:hover .project-overlay {
    @apply opacity-100;
}
</style>

<div class="portfolio-container max-w-7xl mx-auto px-4">
    <div class="portfolio-header">
        <h2 class="portfolio-subtitle">My Projects</h2>
        <p class="portfolio-description">
            Here is the list of my active side projects. Each one represents a unique challenge and learning experience in my journey as a developer.
        </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <!-- naixu -->
        <div class="project-card" data-aos="fade-up">
            <div class="project-overlay"></div>
            <div class="project-content">
                <a href="https://naixu.vn" target="_blank" class="block">
                    <h2 class="project-title">Nai Xừ</h2>
                </a>
                <div class="project-image mb-4">
                    {{< resize-image src="naixu.png" >}}
                </div>
                <p class="text-gray-400 mb-4">Share and discover the best products with the community</p>
                <div class="flex flex-wrap gap-2">
                    <span class="tag">Golang</span>
                    <span class="tag">Nuxt</span>
                    <span class="tag">Redis</span>
                    <span class="tag">RabbitMQ</span>
                    <span class="tag">Docker</span>
                    <span class="tag">Ansible</span>
                </div>
            </div>
        </div>

        <!-- qrzam -->
        <div class="project-card" data-aos="fade-up" data-aos-delay="100">
            <div class="project-overlay"></div>
            <div class="project-content">
                <a href="https://qrzam.com" target="_blank" class="block">
                    <h2 class="project-title">QR Zam</h2>
                </a>
                <div class="project-image mb-4">
                    {{< resize-image src="qrzam.jpeg" >}}
                </div>
                <p class="text-gray-400 mb-4">Unlock your unique potential with QR codes</p>
                <div class="flex flex-wrap gap-2">
                    <span class="tag">Golang</span>
                    <span class="tag">PHP</span>
                    <span class="tag">Nuxt</span>
                    <span class="tag">Redis</span>
                    <span class="tag">Docker</span>
                    <span class="tag">i18n</span>
                </div>
            </div>
        </div>

        <!-- ewhyn -->
        <div class="project-card" data-aos="fade-up">
            <div class="project-overlay"></div>
            <div class="project-content">
                <a href="https://ewhyn.com" target="_blank" class="block">
                    <h2 class="project-title">ewhyn</h2>
                </a>
                <div class="project-image mb-4">
                    {{< resize-image src="ewhyn.png" >}}
                </div>
                <p class="text-gray-400 mb-4">Ask questions and find the best simple right answers</p>
                <div class="flex flex-wrap gap-2">
                    <span class="tag">Golang</span>
                    <span class="tag">Vue.js</span>
                    <span class="tag">Redis</span>
                    <span class="tag">Grpc Web</span>
                    <span class="tag">Docker</span>
                </div>
            </div>
        </div>

        <!-- gmob -->
        <div class="project-card" data-aos="fade-up" data-aos-delay="100">
            <div class="project-overlay"></div>
            <div class="project-content">
                <a href="https://github.com/tungquach/gmob" target="_blank" class="block">
                    <h2 class="project-title">Gmob</h2>
                </a>
                <div class="project-image mb-4">
                    {{< resize-image src="open.png" >}}
                </div>
                <p class="text-gray-400 mb-4">Go MongoDB driver document builder</p>
                <div class="flex flex-wrap gap-2">
                    <span class="tag">Golang</span>
                    <span class="tag">MongoDB</span>
                    <span class="tag">Open Source</span>
                    <span class="tag">Github</span>
                </div>
            </div>
        </div>

        <!-- owids -->
        <div class="project-card" data-aos="fade-up">
            <div class="project-overlay"></div>
            <div class="project-content">
                <a href="https://owids.com" target="_blank" class="block">
                    <h2 class="project-title">Owids</h2>
                </a>
                <div class="project-image mb-4">
                    {{< resize-image src="owids.png" >}}
                </div>
                <p class="text-gray-400 mb-4">Your Ultimate All-in-One Website Tool</p>
                <div class="flex flex-wrap gap-2">
                    <span class="tag">Golang</span>
                    <span class="tag">Vue.js</span>
                    <span class="tag">Python</span>
                    <span class="tag">PHP</span>
                    <span class="tag">MySQL</span>
                </div>
            </div>
        </div>

        <!-- myboringtools -->
        <div class="project-card" data-aos="fade-up" data-aos-delay="100">
            <div class="project-overlay"></div>
            <div class="project-content">
                <a href="https://myboringtools.com" target="_blank" class="block">
                    <h2 class="project-title">MyBoringTools</h2>
                </a>
                <div class="project-image mb-4">
                    {{< resize-image src="myboringtools.png" >}}
                </div>
                <p class="text-gray-400 mb-4">Let this tool do the boring job for you!</p>
                <div class="flex flex-wrap gap-2">
                    <span class="tag">Golang</span>
                    <span class="tag">Vue.js</span>
                    <span class="tag">Wasm</span>
                    <span class="tag">Docker</span>
                </div>
            </div>
        </div>

        <!-- supics -->
        <div class="project-card" data-aos="fade-up">
            <div class="project-overlay"></div>
            <div class="project-content">
                <a href="https://supics.com" target="_blank" class="block">
                    <h2 class="project-title">Supics</h2>
                </a>
                <div class="project-image mb-4">
                    {{< resize-image src="supics.png" >}}
                </div>
                <p class="text-gray-400 mb-4">The best awesome wallpapers & pictures for any devices</p>
                <div class="flex flex-wrap gap-2">
                    <span class="tag">Golang</span>
                    <span class="tag">Vue.js</span>
                    <span class="tag">Firebase</span>
                    <span class="tag">Azure CV</span>
                </div>
            </div>
        </div>

        <!-- notezam -->
        <div class="project-card" data-aos="fade-up" data-aos-delay="100">
            <div class="project-overlay"></div>
            <div class="project-content">
                <a href="https://notezam.com" target="_blank" class="block">
                    <h2 class="project-title">Notezam</h2>
                </a>
                <div class="project-image mb-4">
                    {{< resize-image src="notezam.png" >}}
                </div>
                <p class="text-gray-400 mb-4">Keep, share & manage your snippets</p>
                <div class="flex flex-wrap gap-2">
                    <span class="tag">Django</span>
                    <span class="tag">Nuxt</span>
                    <span class="tag">PostgreSQL</span>
                    <span class="tag">Redis</span>
                </div>
            </div>
        </div>
    </div>

    <div class="mt-16 pt-8 border-t border-gray-700/30">
        <p class="text-gray-400">
            If you like my work or have a job opportunity, feel free to reach out at 
            <a href="mailto:hi@cozi.dev" class="text-primary hover:underline transition-colors duration-300">hi@cozi.dev</a>
        </p>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });
});
</script>
{{< /rawhtml >}}