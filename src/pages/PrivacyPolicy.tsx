import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center space-y-6 mb-16">
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Privacy Policy
              </h1>
              <p className="text-xl text-muted-foreground">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <Card className="bg-gradient-card backdrop-blur-lg border-primary/20">
              <CardContent className="p-8 space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Welcome to Artifox. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered image transformation service. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
                  <div className="space-y-4 text-muted-foreground">
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-2">Personal Information</h3>
                      <p className="leading-relaxed">
                        We may collect personal information such as your name, email address, and payment information when you create an account or make a purchase.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-2">Images and Content</h3>
                      <p className="leading-relaxed">
                        We temporarily process the images you upload for AI transformation. Images are processed and then permanently deleted from our servers within 24 hours.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-foreground mb-2">Usage Data</h3>
                      <p className="leading-relaxed">
                        We collect information about how you use our service, including the number of transformations, styles selected, and general usage patterns.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>To provide and maintain our AI transformation service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>To process your images and deliver transformed results</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>To manage your account and provide customer support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>To improve our service and develop new features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                      <span>To send you important updates about our service</span>
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Data Security</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We implement appropriate security measures to protect your personal information and uploaded images. All data transmission is encrypted using industry-standard SSL/TLS protocols. Your images are processed on secure servers and automatically deleted within 24 hours.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Third-Party Services</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We use third-party AI services (Replicate) to process your images. These services are bound by their own privacy policies and security measures. We do not share your personal information with third parties except as necessary to provide our service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    You have the right to access, update, or delete your personal information. You can request a copy of your data or ask us to delete your account at any time by contacting us at support@artifox.ai.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Changes to This Policy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about this Privacy Policy, please contact us at support@artifox.ai.
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

export default PrivacyPolicy;