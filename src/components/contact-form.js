export default function ContactForm() {
  return (
    <form className="contact-form" action="https://formsubmit.co/102565a61ca8d772df0452c439bf72a7" method="POST">
      <div className="form-group">
        <label htmlFor="name">Votre nom</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Votre email</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Votre t&eacute;l&eacute;phone</label>
        <input type="tel" id="phone" name="phone" />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required />
      </div>
      <button type="submit" className="btn">Envoyer le message</button>
    </form>
  );
}
