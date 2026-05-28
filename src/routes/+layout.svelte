<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { ToastContainer } from '$lib/components/ui';
	import 'virtual:uno.css';

	let { children } = $props();
</script>

<Navbar />
<main>
	{@render children()}
</main>
<Footer />
<ToastContainer />
