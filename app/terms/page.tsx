import type { Metadata } from "next";
import LegalPageShell, { LegalSection } from "../components/LegalPageShell";

export const metadata: Metadata = {
  title: "Terms of Service | AUTOREELIX",
  description:
    "Terms of Service for AUTOREELIX and SmartOrb, including acceptable use, accounts, and third-party platform connections.",
};

export default function TermsPage() {
  return (
    <LegalPageShell
      title="Terms of Service"
      description="These Terms govern your access to and use of AUTOREELIX, SmartOrb, and related websites, applications, and services."
      lastUpdated="July 29, 2026"
    >
      <LegalSection title="1. Agreement to Terms">
        <p>
          By accessing or using AUTOREELIX (&quot;Service&quot;), including our website at
          autoreelix.com and any related applications or features, you agree to these Terms of
          Service (&quot;Terms&quot;). If you do not agree, do not use the Service.
        </p>
        <p>
          The Service is operated by AUTOREELIX (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;).
          These Terms apply to founding creators, early-access applicants, account holders, and
          visitors.
        </p>
      </LegalSection>

      <LegalSection title="2. Description of the Service">
        <p>
          AUTOREELIX provides creator intelligence tools, including SmartOrb, an AI Creative
          Director designed to help creators analyze content, understand performance patterns, and
          receive creative guidance. Features may include early-access programs, content analysis,
          personalized recommendations, and optional connections to third-party platforms such as
          TikTok, YouTube, or similar services.
        </p>
        <p>
          The Service is evolving. Features may change, be limited during beta, or become
          unavailable without notice.
        </p>
      </LegalSection>

      <LegalSection title="3. Eligibility and Accounts">
        <p>
          You must be at least 13 years old, or the minimum age required in your jurisdiction, to
          use the Service. If you are under 18, you represent that you have parental or guardian
          consent where required.
        </p>
        <p>
          You are responsible for the accuracy of information you submit (including early-access
          applications), for maintaining the security of your account credentials, and for all
          activity under your account.
        </p>
      </LegalSection>

      <LegalSection title="4. Acceptable Use">
        <p>You agree not to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Use the Service for unlawful, harmful, fraudulent, or abusive purposes</li>
          <li>Attempt to reverse engineer, scrape, or disrupt the Service or its infrastructure</li>
          <li>Upload or submit content you do not have rights to use</li>
          <li>Misrepresent your identity, affiliation, or ownership of connected accounts</li>
          <li>Use the Service to violate any third-party platform terms (including TikTok, YouTube, or Google)</li>
          <li>Interfere with other users&apos; access to or enjoyment of the Service</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Your Content and Platform Connections">
        <p>
          You retain ownership of content you create and submit. By submitting content or connecting
          a third-party account, you grant AUTOREELIX a limited license to process that content and
          related metadata solely to provide, improve, and secure the Service.
        </p>
        <p>
          If you connect platforms such as TikTok or YouTube, you authorize us to access information
          permitted by those platforms and by your consent, such as profile details, video metadata,
          analytics, and other data needed to deliver creator intelligence features. You can revoke
          access through the third-party platform or by contacting us.
        </p>
        <p>
          You represent that you have the rights and authority to connect those accounts and to
          authorize our access.
        </p>
      </LegalSection>

      <LegalSection title="6. AI-Generated Guidance">
        <p>
          SmartOrb and related features may provide AI-generated analysis, suggestions, ideas, or
          feedback. This output is informational and not professional legal, financial, medical, or
          business advice. You remain solely responsible for decisions you make based on the
          Service, including publishing content and complying with platform policies.
        </p>
      </LegalSection>

      <LegalSection title="7. Intellectual Property">
        <p>
          AUTOREELIX, SmartOrb, our branding, software, designs, and related materials are owned by
          us or our licensors and are protected by applicable intellectual property laws. These Terms
          do not grant you any right to use our trademarks or brand assets except as needed to use
          the Service.
        </p>
      </LegalSection>

      <LegalSection title="8. Early Access and Beta Features">
        <p>
          Early-access, founding creator, and beta features are provided &quot;as is&quot; and may
          be incomplete, unstable, or changed. Participation does not guarantee continued access,
          pricing, or any specific future feature.
        </p>
      </LegalSection>

      <LegalSection title="9. Third-Party Services">
        <p>
          The Service may integrate with or link to third-party services (including OAuth providers
          and analytics tools). Those services are governed by their own terms and privacy policies.
          We are not responsible for third-party services.
        </p>
      </LegalSection>

      <LegalSection title="10. Disclaimers">
        <p>
          THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES
          OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A
          PARTICULAR PURPOSE, AND NON-INFRINGEMENT. We do not warrant that the Service will be
          uninterrupted, error-free, or that results will meet your expectations.
        </p>
      </LegalSection>

      <LegalSection title="11. Limitation of Liability">
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, AUTOREELIX AND ITS AFFILIATES, OFFICERS,
          EMPLOYEES, AND AGENTS WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, GOODWILL, OR BUSINESS
          OPPORTUNITIES, ARISING FROM OR RELATED TO YOUR USE OF THE SERVICE.
        </p>
      </LegalSection>

      <LegalSection title="12. Termination">
        <p>
          We may suspend or terminate access to the Service at any time if you violate these Terms,
          if required by law, or if we discontinue the Service. You may stop using the Service at
          any time. Provisions that by their nature should survive termination will survive.
        </p>
      </LegalSection>

      <LegalSection title="13. Changes to These Terms">
        <p>
          We may update these Terms from time to time. The &quot;Last updated&quot; date at the top
          of this page will reflect the latest revision. Continued use of the Service after changes
          become effective constitutes acceptance of the updated Terms.
        </p>
      </LegalSection>

      <LegalSection title="14. Contact">
        <p>
          Questions about these Terms can be sent to{" "}
          <a
            href="mailto:support@autoreelix.com"
            className="text-cyan-300 underline decoration-cyan-400/40 underline-offset-2 transition hover:text-cyan-200"
          >
            support@autoreelix.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalPageShell>
  );
}
