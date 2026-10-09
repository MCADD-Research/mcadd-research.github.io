<script setup lang="ts">
import { site } from '~/content/site'
import { understanding } from '~/content/understanding'
import { diagnosis } from '~/content/diagnosis'
import { living } from '~/content/living'
import { emergency } from '~/content/emergency'
import { trials } from '~/content/research'
import { evidenceLevels } from '~/content/evidenceLegend'

usePageSeo({
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    description: site.description,
    url: site.siteUrl + '/',
    about: {
      '@type': 'MedicalCondition',
      name: 'Medium-chain acyl-CoA dehydrogenase deficiency',
      alternateName: 'MCADD',
    },
  },
})

const topicCards = [
  { kicker: understanding.shortTitle, heading: understanding.title, description: understanding.description, to: '/understanding' },
  { kicker: diagnosis.shortTitle, heading: diagnosis.title, description: diagnosis.description, to: '/diagnosis' },
  { kicker: living.shortTitle, heading: living.title, description: living.description, to: '/living' },
  { kicker: emergency.shortTitle, heading: emergency.title, description: emergency.description, to: '/emergency', urgent: true },
]

const recruitingCount = computed(() => trials.filter((t) => t.status === 'RECRUITING').length)
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <div class="container hero-inner">
        <p class="hero-eyebrow">An evidence-based guide</p>
        <h1 class="hero-title">MCADD,<br />made clear.</h1>
        <p class="hero-lede">
          Medium-chain acyl-CoA dehydrogenase deficiency — explained from the simple to the deeply scientific, so you can
          understand it, live safely with it, and follow the research that matters.
        </p>
        <div class="hero-actions">
          <NuxtLink to="/understanding" class="btn btn-primary">Understand MCADD</NuxtLink>
          <NuxtLink to="/research" class="btn btn-outline">Explore the research</NuxtLink>
        </div>

        <dl class="hero-facts">
          <div class="fact">
            <dt>Incidence (US)</dt>
            <dd>1 in 17,000</dd>
          </div>
          <div class="fact">
            <dt>Most common mutation</dt>
            <dd>K304E (c.985A&gt;G)</dd>
          </div>
          <div class="fact">
            <dt>Cornerstone of care</dt>
            <dd>Avoiding fasting</dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- Emergency strip -->
    <section class="container">
      <div class="emergency-strip">
        <div class="emergency-strip-icon" aria-hidden="true">⚠</div>
        <div>
          <strong>In an emergency:</strong> persistent vomiting, unusual drowsiness, confusion, seizures, or being unable
          to eat or drink are signs to act on immediately.
          <NuxtLink to="/emergency">What to do</NuxtLink>
        </div>
      </div>
    </section>

    <!-- The 30-second explainer -->
    <section class="container section">
      <div class="explainer">
        <div class="explainer-text">
          <h2>The 30-second version</h2>
          <p>
            Your body usually runs on two fuels: sugar and fat. Between meals and overnight, it switches to burning fat
            for energy. In MCADD, an enzyme that helps burn a certain type of fat (medium-chain fats) does not work
            properly.
          </p>
          <p>
            Most of the time this causes no problem. But if a person with MCADD goes too long without food — especially
            during illness — the body can run out of usable energy while partly processed fats build up. That can lead to
            a dangerous metabolic crisis.
          </p>
          <p>
            The good news: this is largely preventable. <strong>Avoiding long periods without food</strong> and having an
            emergency plan mean most people with MCADD live healthy, normal lives.
          </p>
        </div>
        <div class="explainer-aside card">
          <p class="aside-heading">A term to know</p>
          <p class="aside-term">Hypoketotic hypoglycemia</p>
          <p class="aside-def">
            Low blood sugar <em>with</em> unusually low ketones — the signature of an MCADD crisis.
          </p>
          <NuxtLink to="/glossary" class="aside-link">Browse the glossary →</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Topics -->
    <section class="container section">
      <div class="section-head">
        <h2>Explore the guide</h2>
        <p class="section-sub">Five paths through the knowledge base — start anywhere, go as deep as you like.</p>
      </div>
      <div class="topic-grid">
        <NuxtLink
          v-for="card in topicCards"
          :key="card.to"
          :to="card.to"
          class="topic-card card"
          :class="{ 'topic-card-urgent': card.urgent }"
        >
          <span class="topic-card-kicker">{{ card.kicker }}</span>
          <h3 class="topic-card-title">{{ card.heading }}</h3>
          <p class="topic-card-desc">{{ card.description }}</p>
          <span class="topic-card-link" aria-hidden="true">Read →</span>
        </NuxtLink>
        <NuxtLink to="/research" class="topic-card card topic-card-research">
          <span class="topic-card-kicker">Research</span>
          <h3 class="topic-card-title">Research &amp; clinical trials</h3>
          <p class="topic-card-desc">
            The latest trials and emerging therapies, clearly separated into established knowledge, ongoing research, and
            experimental work.
          </p>
          <span class="topic-card-stat">{{ recruitingCount }} trial{{ recruitingCount === 1 ? '' : 's' }} currently recruiting</span>
        </NuxtLink>
      </div>
    </section>

    <!-- Evidence legend -->
    <section class="container section">
      <div class="evidence-teaser card">
        <div class="evidence-teaser-head">
          <h2>How confident should you be?</h2>
          <p class="section-sub">
            Every claim on this site is labelled with an evidence level and its sources, so you can tell established fact
            from experimental work at a glance.
          </p>
        </div>
        <ul class="evidence-list">
          <li v-for="e in evidenceLevels" :key="e.level" class="evidence-item">
            <span class="pill" :class="`ev-${e.level.toLowerCase()}`">● Level {{ e.level }}</span>
            <span class="evidence-def">{{ e.definition }}</span>
          </li>
        </ul>
        <NuxtLink to="/methodology" class="btn btn-outline">How this content is verified</NuxtLink>
      </div>
    </section>

    <!-- Final note -->
    <section class="container section">
      <div class="closing card">
        <p class="closing-note">
          <strong>{{ site.name }}</strong> is a guide, not a doctor. All medical content here is traced to published,
          cited sources — verified {{ site.contentLastVerified }} — but your metabolic team knows <em>your</em> MCADD best.
        </p>
        <div class="closing-actions">
          <NuxtLink to="/living" class="btn btn-primary">Living with MCADD</NuxtLink>
          <NuxtLink to="/resources" class="btn btn-outline">Resources &amp; sources</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  background:
    radial-gradient(60rem 40rem at 85% -10%, var(--brand-200) 0%, transparent 60%),
    radial-gradient(40rem 30rem at 0% 10%, var(--brand-100) 0%, transparent 55%),
    var(--bg-elevated);
  border-bottom: 1px solid var(--border);
}
[data-theme='dark'] .hero {
  background:
    radial-gradient(60rem 40rem at 85% -10%, var(--brand-900) 0%, transparent 60%),
    radial-gradient(40rem 30rem at 0% 10%, var(--brand-950) 0%, transparent 55%),
    var(--bg-elevated);
}
.hero-inner {
  padding-top: clamp(3rem, 8vw, 6rem);
  padding-bottom: clamp(2.5rem, 6vw, 4.5rem);
}
.hero-eyebrow {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-weight: 700;
  color: var(--brand-700);
  margin: 0 0 1rem;
}
[data-theme='dark'] .hero-eyebrow {
  color: var(--brand-300);
}
.hero-title {
  font-size: clamp(2.75rem, 8vw, 5rem);
  line-height: 1.02;
  letter-spacing: -0.03em;
  margin-bottom: 1.25rem;
}
.hero-lede {
  font-size: clamp(1.1rem, 2.2vw, 1.35rem);
  line-height: 1.6;
  color: var(--text-muted);
  max-width: 54ch;
  margin-bottom: 1.75rem;
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
}
.hero-facts {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem 3rem;
  margin: 0;
  padding-top: 1.75rem;
  border-top: 1px solid var(--border);
}
.fact dt {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
  color: var(--text-faint);
  margin-bottom: 0.2rem;
}
.fact dd {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 600;
}

.emergency-strip {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin-top: 1.5rem;
  padding: 1.1rem 1.3rem;
  background: var(--callout-danger-bg);
  border: 1px solid var(--callout-danger-border);
  border-radius: var(--radius-lg);
  color: var(--callout-danger-fg);
  font-size: 0.98rem;
}
.emergency-strip-icon {
  font-size: 1.3rem;
  line-height: 1;
}
.emergency-strip a {
  color: inherit;
  font-weight: 700;
  text-decoration: underline;
  margin-left: 0.35rem;
}

.section {
  margin-top: clamp(2.5rem, 6vw, 4rem);
}
.section-head {
  max-width: 60ch;
  margin-bottom: 1.5rem;
}
.section-head h2 {
  margin-bottom: 0.4rem;
}
.section-sub {
  color: var(--text-muted);
  margin: 0;
}

.explainer {
  display: grid;
  grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
  gap: 2rem;
  align-items: stretch;
}
.explainer-text h2 {
  margin-bottom: 0.75rem;
}
.explainer-text p {
  color: var(--text-muted);
}
.explainer-text strong {
  color: var(--text);
}
.explainer-aside {
  padding: 1.5rem;
  height: fit-content;
}
.aside-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
  color: var(--text-faint);
  margin: 0 0 0.5rem;
}
.aside-term {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
}
.aside-def {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin: 0 0 1rem;
}
.aside-link {
  font-weight: 600;
}

.topic-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}
.topic-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
  color: var(--text);
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
}
.topic-card:hover {
  text-decoration: none;
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: var(--border-strong);
}
.topic-card-kicker {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
  color: var(--brand-700);
}
[data-theme='dark'] .topic-card-kicker {
  color: var(--brand-300);
}
.topic-card-title {
  margin: 0;
  font-size: 1.3rem;
}
.topic-card-desc {
  color: var(--text-muted);
  font-size: 0.95rem;
  margin: 0;
  flex-grow: 1;
}
.topic-card-link,
.topic-card-stat {
  font-weight: 650;
  color: var(--link);
  font-size: 0.92rem;
}
.topic-card-urgent {
  border-color: var(--callout-danger-border);
}
.topic-card-urgent .topic-card-kicker {
  color: var(--callout-danger-fg);
}
.topic-card-research {
  background: linear-gradient(160deg, var(--surface), var(--brand-soft));
}

.evidence-teaser {
  padding: clamp(1.5rem, 4vw, 2.5rem);
  display: grid;
  gap: 1.5rem;
}
.evidence-teaser-head {
  max-width: 60ch;
}
.evidence-teaser-head h2 {
  margin-bottom: 0.4rem;
}
.evidence-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.7rem;
}
.evidence-item {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
}
.evidence-item .pill {
  flex-shrink: 0;
}
.evidence-def {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.closing {
  padding: clamp(1.5rem, 4vw, 2.5rem);
  text-align: center;
}
.closing-note {
  max-width: 60ch;
  margin: 0 auto 1.5rem;
  color: var(--text-muted);
}
.closing-note strong {
  color: var(--text);
}
.closing-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

@media (max-width: 900px) {
  .topic-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .explainer {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 560px) {
  .topic-grid {
    grid-template-columns: 1fr;
  }
}
</style>
