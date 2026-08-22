import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactElement,
} from "react";

type FormInputElement = HTMLInputElement | HTMLTextAreaElement;

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const validateForm = (values: ContactFormValues): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.message.trim()) {
    errors.message = "Please enter your message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters long.";
  }

  return errors;
};

const isContactFormField = (
  name: string,
): name is keyof ContactFormValues => {
  return name === "name" || name === "email" || name === "message";
};

const ContactSection = (): ReactElement => {
  const [formValues, setFormValues] = useState<ContactFormValues>({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<ContactFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (event: ChangeEvent<FormInputElement>): void => {
    const { name, value } = event.target;

    if (!isContactFormField(name)) {
      return;
    }

    setFormValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));

    setFormErrors((previousErrors) => ({
      ...previousErrors,
      [name]: undefined,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const errors = validateForm(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setIsSubmitted(false);
      return;
    }

    setIsSubmitted(true);
    setFormValues({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section id="contact" className="section-inner">
      <span className="eyebrow">03 — Contact</span>
      <h2>Let&rsquo;s create something great</h2>
      <div className="contact-layout">
        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              aria-required="true"
              aria-invalid={Boolean(formErrors.name)}
              aria-describedby={formErrors.name ? "name-error" : undefined}
              value={formValues.name}
              onChange={handleInputChange}
            />
            {formErrors.name && (
              <span id="name-error" role="alert">
                {formErrors.name}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              aria-required="true"
              aria-invalid={Boolean(formErrors.email)}
              aria-describedby={formErrors.email ? "email-error" : undefined}
              value={formValues.email}
              onChange={handleInputChange}
            />
            {formErrors.email && (
              <span id="email-error" role="alert">
                {formErrors.email}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              aria-required="true"
              aria-invalid={Boolean(formErrors.message)}
              aria-describedby={
                formErrors.message ? "message-error" : undefined
              }
              value={formValues.message}
              onChange={handleInputChange}
            />
            {formErrors.message && (
              <span id="message-error" role="alert">
                {formErrors.message}
              </span>
            )}
          </div>

          <div className="contact-form__submit-row">
            <button type="submit">Send message</button>
            <p className="form-hint">All fields are required.</p>
          </div>
          {isSubmitted && (
            <p className="success-message" role="status">
              Your message has been sent successfully.
            </p>
          )}
        </form>
        <div className="contact-intro">
          <p>
            I can&rsquo;t wait to dive into a new project — there&rsquo;s
            nothing quite like turning a blank page into something people
            actually use. If you&rsquo;ve got an idea sitting in a notebook, a
            product that needs an extra pair of hands, or a problem you
            haven&rsquo;t quite cracked yet, I&rsquo;d love to hear about it.
          </p>
          <p>
            Let&rsquo;s talk about how we can bring your idea to life — drop
            me a message and I&rsquo;ll get back to you soon.
          </p>
          <div className="contact-intro__links">
            <a href="mailto:emilaugustynowicz@gmail.com">
              emilaugustynowicz@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/emil-augustynowicz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/emil-augustynowicz
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
