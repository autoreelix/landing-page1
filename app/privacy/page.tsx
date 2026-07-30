import type { Metadata } from "next";
import LegalPageShell, { LegalSection } from "../components/LegalPageShell";

export const metadata: Metadata = {
  title: "Privacy Policy | AUTOREELIX",
  description:
    "Privacy Policy for AUTOREELIX and SmartOrb, including how we collect, use, and protect personal and platform data.",
};

export default function PrivacyPage() {
  return (
    <LegalPageShell
      title="Privacy Policy"
      description="This Privacy Policy explains how AUTOREELIX collects, uses, shares, and protects information when you use our website, applications, and related services."
      lastUpdated="July 29, 2026"
    >
      <LegalSection title="1. Who We Are">
        <p>
          AUTOREELIX (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website at
          autoreelix.com and related products, including SmartOrb. This Policy applies to visitors,
          early-access applicants, account holders, and users who connect third-party platforms.
        </p>
        <p>
          Contact:{" "}
          <a
            href="mailto:support@autoreelix.com"
            className="text-cyan-300 underline decoration-cyan-400/40 underline-offset-2 transition hover:text-cyan-200"
          >
            support@autoreelix.com
          </a>
        </p>
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        <p>We may collect the following categories of information:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <span className="text-slate-200">Information you provide:</span> name, email address,
            creator profile details, application responses, preferences, and messages you send us
          </li>
          <li>
            <span className="text-slate-200">Account and usage data:</span> login activity, feature
            usage, device/browser information, approximate location derived from IP address, and
            diagnostic logs
          </li>
          <li>
            <span className="text-slate-200">Content you submit:</span> prompts, feedback, uploaded
            media, and related metadata used to provide creator intelligence features
          </li>
          <li>
            <span className="text-slate-200">Third-party platform data:</span> if you connect
            services such as TikTok or YouTube / Google, we may receive profile information, channel
            or account identifiers, video metadata, analytics, and other data authorized by you and
            permitted by those platforms
          </li>
          <li>
            <span className="text-slate-200">Cookies and similar technologies:</span> used for
            essential site function, analytics, and improving the Service
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. How We Use Information">
        <p>We use information to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Provide, operate, and improve AUTOREELIX and SmartOrb</li>
          <li>Process early-access and founding creator applications</li>
          <li>Personalize creative guidance and analyze content performance patterns</li>
          <li>Authenticate users and manage connected platform accounts</li>
          <li>Communicate about the Service, updates, and support</li>
          <li>Monitor abuse, secure systems, and enforce our Terms</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p>
          We do not sell your personal information. We do not use connected platform data to train
          unrelated public models outside the AUTOREELIX product experience without your
          authorization.
        </p>
      </LegalSection>

      <LegalSection title="4. Third-Party Platform Connections">
        <p>
          When you connect TikTok, YouTube, Google, or similar platforms via OAuth or other
          authorized methods, those providers share certain data with us based on the permissions
          you grant. We use that data only to deliver the features you request, such as content
          analysis, creative guidance, and growth insights.
        </p>
        <p>
          You can revoke platform access at any time through the third-party provider&apos;s account
          settings or by contacting us. Revoking access may limit features that depend on that
          connection.
        </p>
        <p>
          Your use of third-party platforms remains subject to those platforms&apos; terms and
          privacy policies.
        </p>
      </LegalSection>

      <LegalSection title="5. How We Share Information">
        <p>We may share information with:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Service providers who help us host, analyze, communicate, or operate the Service under
            confidentiality obligations
          </li>
          <li>Third-party platforms you choose to connect, as needed to authenticate and sync data</li>
          <li>Professional advisors, when required for legal, security, or compliance purposes</li>
          <li>Authorities, if required by law or to protect rights, safety, and security</li>
          <li>A successor entity, if we are involved in a merger, acquisition, or asset transfer</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Data Retention">
        <p>
          We retain personal information for as long as needed to provide the Service, fulfill the
          purposes described in this Policy, comply with legal obligations, resolve disputes, and
          enforce our agreements. Connected platform data may be deleted or disconnected when you
          revoke access or request deletion, subject to legal retention requirements.
        </p>
      </LegalSection>

      <LegalSection title="7. Security">
        <p>
          We use reasonable administrative, technical, and organizational measures designed to
          protect personal information. No method of transmission or storage is completely secure,
          and we cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection title="8. Your Rights and Choices">
        <p>
          Depending on your location, you may have rights to access, correct, delete, or export your
          personal information, or to object to or restrict certain processing. You may also opt out
          of non-essential communications.
        </p>
        <p>
          To exercise privacy requests, email{" "}
          <a
            href="mailto:support@autoreelix.com"
            className="text-cyan-300 underline decoration-cyan-400/40 underline-offset-2 transition hover:text-cyan-200"
          >
            support@autoreelix.com
          </a>
          . We may need to verify your request before responding.
        </p>
      </LegalSection>

      <LegalSection title="9. Children&apos;s Privacy">
        <p>
          The Service is not directed to children under 13 (or the equivalent minimum age in your
          jurisdiction). We do not knowingly collect personal information from children. If you
          believe a child has provided personal information, contact us and we will take appropriate
          steps to delete it.
        </p>
      </LegalSection>

      <LegalSection title="10. International Transfers">
        <p>
          Information may be processed in the United States or other countries where we or our
          service providers operate. Those locations may have different data protection laws than
          your home country.
        </p>
      </LegalSection>

      <LegalSection title="11. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at
          the top of this page will reflect the latest revision. If changes are material, we may
          provide additional notice where appropriate.
        </p>
      </LegalSection>

      <LegalSection title="12. Contact Us">
        <p>
          For privacy questions or requests, contact{" "}
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
