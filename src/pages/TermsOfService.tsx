import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center space-y-6 mb-16">
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Terms of Service
              </h1>
              <p className="text-xl text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <Card className="bg-gradient-card backdrop-blur-lg border-primary/20">
              <CardContent className="p-8 space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Agreement to Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using Artifox, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Description of Service</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Artifox is an AI-powered image transformation service that allows users to upload photos and transform them into various artistic styles using artificial intelligence. The service is provided on a credit-based system with both free and paid options.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">User Accounts</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p className="leading-relaxed">
                      You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>You must provide accurate and complete information when creating an account</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>You must be at least 13 years old to use this service</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>You are responsible for keeping your login credentials secure</span>
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Acceptable Use</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p className="leading-relaxed">You agree not to use the service to:</p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></span>
                        <span>Upload images that violate copyright, privacy, or other rights</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></span>
                        <span>Upload inappropriate, offensive, or illegal content</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></span>
                        <span>Attempt to reverse engineer or exploit our AI models</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></span>
                        <span>Use automated systems to abuse our service</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></span>
                        <span>Share your account credentials with others</span>
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Credits and Payment</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p className="leading-relaxed">
                      Our service operates on a credit-based system. New users receive 5 free credits upon registration. Additional credits can be purchased through our pricing plans.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>Credits are non-refundable once used</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>Unused credits do not expire</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span>Payment processing is handled by secure third-party providers</span>
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Intellectual Property</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p className="leading-relaxed">
                      You retain ownership of the original images you upload. The transformed images generated by our AI service are provided to you for your use. However, you must ensure you have the right to use the original images you upload.
                    </p>
                    <p className="leading-relaxed">
                      Our AI models, software, and service are protected by intellectual property laws and remain our property.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Limitation of Liability</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Artifox is provided "as is" without warranties of any kind. We shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use of our service. Our total liability shall not exceed the amount you paid for the service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Service Availability</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We strive to maintain high service availability but do not guarantee uninterrupted service. We reserve the right to modify, suspend, or discontinue the service at any time with reasonable notice.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Termination</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may terminate or suspend your account immediately if you violate these terms. You may also terminate your account at any time by contacting us. Upon termination, your access to the service will cease, but these terms will remain in effect.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to modify these terms at any time. We will notify users of significant changes via email or through our service. Continued use of the service after changes constitutes acceptance of the new terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Information</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about these Terms of Service, please contact us at support@artifox.ai.
                  </p>
                </section>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;