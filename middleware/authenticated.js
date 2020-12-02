export default function (context) {
  // Add the userAgent property to the context
  if (!context.store.state.logined) {
    context.redirect('/login')
  }
}
