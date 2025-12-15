// Allow importing the JS home.jsx file without TypeScript errors.
// This declares the specific module specifier used in `src/App.tsx`.
declare module './pages/home' {
  const HomePage: any
  export default HomePage
}
