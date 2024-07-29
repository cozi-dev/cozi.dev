---
layout: "page"
title: "Portfolio"
---
<p class="pt-10"></p>
<p>
Here is the list of my active (not really) side projects, so much fail but I love to build :)
</p>


{{< rawhtml >}}
<script src="https://cdn.tailwindcss.com"></script>

<style type="text/tailwindcss">
.tag {
    @apply mr-2 mb-2 rounded-full px-3 py-1 text-xs text-white;
    background: #63BDA2;
}

.tag:hover {
    color: white;
    background: #3a9d7f;
}

.portfolio img {
    @apply border-none rounded-t-lg rounded-b-none;
}
</style>

<div class="portfolio grid grid-cols-1 gap-6 my-6">
    <!-- naixu -->
    <div class="border border-gray-500 rounded-lg relative">
        <div class="flex flex-wrap items-center">
            <div class="w-full h-full object-cover object-top">
                {{< resize-image class="w-full" src="naixu.png" >}}
            </div>

            <div class="w-full pt-4 flex flex-col justify-between p-6">
                <div>
                    <a href="https://naixu.vn" target="_blank">
                        <h2 class="font-bold text-xl text-gray-400 hover:text-gray-300">
                            Nai Xừ - Share and discover the best products with the community
                        </h2>
                    </a>

                    <div class="flex flex-wrap text-center pt-4">
                        <div class="tag">Golang</div>
                        <div class="tag">Nuxt</div>
                        <div class="tag">Redis</div>
                        <div class="tag">RabbitMQ</div>
                        <div class="tag">Github</div>
                        <div class="tag">Docker</div>
                        <div class="tag">Ansible</div>
                        <div class="tag">Traefik</div>
                        <div class="tag">Drone CI</div>
                        <div class="tag">Tailwind CSS</div>
                        <div class="tag">Naive UI</div>
                        <div class="tag">i18n</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- naixu -->

    <!-- qrzam -->
    <div class="border border-gray-500 rounded-lg relative">
        <div class="flex flex-wrap items-center">
            <div class="w-full h-full object-cover object-top">
                {{< resize-image class="w-full" src="qrzam.jpeg" >}}
            </div>

            <div class="w-full pt-4 flex flex-col justify-between p-6">
                <div>
                    <a href="https://qrzam.com" target="_blank">
                        <h2 class="font-bold text-xl text-gray-400 hover:text-gray-300">
                            QR Zam - Unlock your unique potential with QR codes
                        </h2>
                    </a>

                    <div class="flex flex-wrap text-center pt-4">
                        <div class="tag">Golang</div>
                        <div class="tag">PHP</div>
                        <div class="tag">Nuxt</div>
                        <div class="tag">Redis</div>
                        <div class="tag">RabbitMQ</div>
                        <div class="tag">Github</div>
                        <div class="tag">Docker</div>
                        <div class="tag">Ansible</div>
                        <div class="tag">Traefik</div>
                        <div class="tag">Drone CI</div>
                        <div class="tag">Tailwind CSS</div>
                        <div class="tag">i18n</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- qrzam -->

    <!-- ewhyn -->
    <div class="border border-gray-500 rounded-lg relative">
        <div class="flex flex-wrap items-center">
            <div class="w-full h-full object-cover object-top">
                {{< resize-image class="w-full" src="ewhyn.png" >}}
            </div>

            <div class="w-full pt-4 flex flex-col justify-between p-6">
                <div>
                    <a href="https://ewhyn.com" target="_blank">
                        <h2 class="font-bold text-xl text-gray-400 hover:text-gray-300">
                            ewhyn - ask question and find the best simple right answer
                        </h2>
                    </a>

                    <div class="flex flex-wrap text-center pt-4">
                        <div class="tag">Golang</div>
                        <div class="tag">Vue.js</div>
                        <div class="tag">Redis</div>
                        <div class="tag">RabbitMQ</div>
                        <div class="tag">Grpc Web</div>
                        <div class="tag">Github</div>
                        <div class="tag">Docker</div>
                        <div class="tag">Ansible</div>
                        <div class="tag">Envoy</div>
                        <div class="tag">Drone CI</div>
                        <div class="tag">Tailwind CSS</div>
                        <div class="tag">i18n</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- ewhyn -->

    <!-- gmob -->
    <div class="border border-gray-500 rounded-lg relative">
        <div class="flex flex-wrap items-center">
            <div class="w-full h-full object-cover object-top">
                {{< resize-image class="w-full" src="open.png" >}}
            </div>

            <div class="w-full pt-4 flex flex-col justify-between p-6">
                <div>
                    <a href="https://github.com/tungquach/gmob" target="_blank">
                        <h2 class="font-bold text-xl text-gray-400 hover:text-gray-300">
                            Gmob - Go MongoDB driver document builder
                        </h2>
                    </a>

                    <div class="flex flex-wrap text-center pt-4">
                        <div class="tag">Golang</div>
                        <div class="tag">MongoDB</div>
                        <div class="tag">Open Source</div>
                        <div class="tag">Github</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- gmob -->

    <!-- owids -->
    <div class="border border-gray-500 rounded-lg relative">
        <div class="flex flex-wrap items-center">
            <div class="w-full h-full object-cover object-top">
                {{< resize-image class="w-full" src="owids.png" >}}
            </div>

            <div class="w-full pt-4 flex flex-col justify-between p-6">
                <div>
                    <a href="https://owids.com" target="_blank">
                        <h2 class="font-bold text-xl text-gray-400 hover:text-gray-300">
                            Owids - Your Ultimate All-in-One Website Tool
                        </h2>
                    </a>

                    <div class="flex flex-wrap text-center pt-4">
                        <div class="tag">Golang</div>
                        <div class="tag">Vue.js</div>
                        <div class="tag">Python</div>
                        <div class="tag">PHP</div>
                        <div class="tag">Redis</div>
                        <div class="tag">RabbitMQ</div>
                        <div class="tag">Github</div>
                        <div class="tag">MySQL</div>
                        <div class="tag">Docker</div>
                        <div class="tag">Ansible</div>
                        <div class="tag">Nginx</div>
                        <div class="tag">Drone CI</div>
                        <div class="tag">Tailwind CSS</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- owids -->

    <!-- myboringtools -->
    <div class="border border-gray-500 rounded-lg relative">
        <div class="flex flex-wrap items-center">
            <div class="w-full h-full object-cover object-top">
                {{< resize-image class="w-full" src="myboringtools.png" >}}
            </div>

            <div class="w-full pt-4 flex flex-col justify-between p-6">
                <div>
                    <a href="https://myboringtools.com" target="_blank">
                        <h2 class="font-bold text-xl text-gray-400 hover:text-gray-300">
                            MyBoringTools - Let this tool does the boring job for you!
                        </h2>
                    </a>

                    <div class="flex flex-wrap text-center pt-4">
                        <div class="tag">Golang</div>
                        <div class="tag">Vue.js</div>
                        <div class="tag">Wasm</div>
                        <div class="tag">Github</div>
                        <div class="tag">Docker</div>
                        <div class="tag">Envoy</div>
                        <div class="tag">Drone CI</div>
                        <div class="tag">Tailwind CSS</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- myboringtools -->

    <!-- supics -->
    <div class="border border-gray-500 rounded-lg relative">
        <div class="flex flex-wrap items-center">
            <div class="w-full h-full object-cover object-top">
                {{< resize-image class="w-full" src="supics.png" >}}
            </div>

            <div class="w-full pt-4 flex flex-col justify-between p-6">
                <div>
                    <a href="https://supics.com" target="_blank">
                        <h2 class="font-bold text-xl text-gray-400 hover:text-gray-300">
                            Supics - The best awesome wallpapers & pictures for any devices
                        </h2>
                    </a>

                    <div class="flex flex-wrap text-center pt-4">
                        <div class="tag">Golang</div>
                        <div class="tag">Vue.js</div>
                        <div class="tag">Grpc Web</div>
                        <div class="tag">Redis</div>
                        <div class="tag">Firebase</div>
                        <div class="tag">Azure Computer Vision</div>
                        <div class="tag">Github</div>
                        <div class="tag">Docker</div>
                        <div class="tag">Ansible</div>
                        <div class="tag">Envoy</div>
                        <div class="tag">Drone CI</div>
                        <div class="tag">Bulma</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- supics -->

    <!-- notezam -->
    <div class="border border-gray-500 rounded-lg relative">
        <div class="flex flex-wrap items-center">
            <div class="w-full h-full object-cover object-top">
                {{< resize-image class="w-full" src="notezam.png" >}}
            </div>

            <div class="w-full pt-4 flex flex-col justify-between p-6">
                <div>
                    <a href="https://notezam.com" target="_blank">
                        <h2 class="font-bold text-xl text-gray-400 hover:text-gray-300">
                            Notezam - Keep, share & manage your snippets
                        </h2>
                    </a>

                    <div class="flex flex-wrap text-center pt-4">
                        <div class="tag">Django</div>
                        <div class="tag">Nuxt</div>
                        <div class="tag">PostgreSQL</div>
                        <div class="tag">Redis</div>
                        <div class="tag">Github</div>
                        <div class="tag">Docker</div>
                        <div class="tag">Ansible</div>
                        <div class="tag">Envoy</div>
                        <div class="tag">Drone CI</div>
                        <div class="tag">Bulma</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- notezam -->
</div>
{{< /rawhtml >}}

<p class="mb-6">If you like my work, job opportunity, drop me a message at this email address: <a class="underline" href="mailto:hi@cozi.dev">hi@cozi.dev</a></p>