import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/shared/button";

export function CtaSection() {
  return (
    <section className="bg-primary">
      <Container className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-primary-foreground text-3xl font-bold md:text-4xl">
            Siap Menemukan Properti Impian Anda?
          </h2>
          <p className="text-primary-foreground/80 mt-4 text-lg">
            Hubungi kami sekarang dan dapatkan bantuan profesional untuk
            kebutuhan properti Anda.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <Link href="/search">
                Mulai Cari
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2"
            >
              <a href="tel:+622112345678">
                <Phone className="h-4 w-4" />
                Hubungi Kami
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
