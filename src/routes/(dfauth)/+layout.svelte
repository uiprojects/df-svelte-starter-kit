<script>
	import '../../app.postcss';
</script>

<main>
	<section class="relative w-full bg-primary-100">
		<!-- <Router url="auth">
			<Route path="login" component={Login} />
			<Route path="register" component={Register} />
		</Router> -->
		<slot />
	</section>
</main>
