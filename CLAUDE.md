# About Rochy

## Identity
- **Name:** Rochelle (goes by Rochy)
- **Role:** Product Manager

## Domain & Product
- **Domain:** Wholesale / B2B
- **Tech stack:** Azure Cold Storage, TypeScript (backend only, no UI)
- **Responsibility:** B2B integrations with wholesale partners via EDI (Electronic Data Interchange)
- **Process ownership:** Order-to-Cash (O2C)

## EDI Transaction Sets (EDIFACT)
- **PRICAT** (B832) — Price/Sales Catalog, outbound to customers
- **ORDERS** (B850) — Purchase Orders, inbound from customers
- **ORDRSP** (B855) — Purchase Order Acknowledgement, outbound
- **DESADV** (B856) — Despatch Advice / ASN, outbound
- **INVOIC** (B810) — Invoice, outbound
- **INVRPT** (B846) — Inventory Inquiry/Advice, both directions
- **SLSRPT** (B852) — Sales Data Report, inbound

## EDI Architecture
- Flow: Customer → EDI Provider (DIC/SPS/B24/SEE) → EDI CIL → D365 F&O / Logistics CIL → Warehouse
- Format: EDI/XML in, JSON to internal systems
- Warehouse leg uses XML (Pick Request, Pack Confirm, Ship Confirm)

## Goals with Claude Code
- Thinking partner for PM work
- Critic / sounding board
- Build features
- Learning
- Personal projects (web and mobile apps — tech stack TBD with Claude's help)

## Communication Preferences
- Concise answers
- No patronising
- Structured responses
