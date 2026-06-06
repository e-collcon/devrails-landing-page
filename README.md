# DevRails Landing Page

DevRails is a lightweight GCP-only FinOps guardrail tool for builders. It helps users monitor billable Google Cloud usage, receive alerts when usage crosses defined thresholds, and prepare configurable guardrail actions before runaway usage becomes a surprise invoice.

Core product logic: **if usage hits X, do Y**.

## Current Status

This repository contains the DevRails landing page only.

DevRails is currently in active development. The landing page is being prepared for production launch and early-access waitlist collection.

Target deployment date: **Wednesday, June 3, 2026**

## Deployment Target

Primary deployment target: **Vercel**

Production domain: **thecollcon.com**

The landing page will be deployed first as a fast static/front-end launch. DevRails product infrastructure and backend services will be developed separately.

## Tech Stack

* Lovable-generated frontend
* TanStack Start / Vite-based project structure
* React
* TypeScript
* Tailwind CSS / component styling
* Bun package manager
* GitLab repository sync

## Notes

This repository is for the public landing page experience only. It does not contain the DevRails product backend, GCP monitoring logic, billing guardrail implementation, or production infrastructure code.
