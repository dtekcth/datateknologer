<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import QRCode from "qrcode";

/* The page a registration email links to (/en/ticket/<code> — the URL
   is baked into the backend's mail text). Renders the ticket QR that
   the crew scans at the door; the QR encodes this origin's admin
   verify URL for the code. */

const route = useRoute();
const code = route.params.code as string;
const qr = ref("");

onMounted(async () => {
  const url = `${location.origin}/en/admin/ticket/${code}`;
  qr.value = await QRCode.toDataURL(url, { margin: 1, width: 480 });
});
</script>

<template>
  <div class="ticket">
    <p class="label">DAG — Event ticket</p>
    <div class="card">
      <img v-if="qr" class="qr" :src="qr" alt="Ticket QR code" />
      <p class="code">{{ code }}</p>
    </div>
    <p class="hint">Show this at the entrance.</p>
  </div>
</template>

<style scoped>
.ticket {
  min-height: 100svh;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-mono);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 22px;
  padding: 24px;
  text-align: center;
}

.label {
  margin: 0;
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--orange);
}

.card {
  background: #fff;
  border: 2px solid var(--ink);
  padding: 18px 18px 12px;
}

.qr {
  display: block;
  width: min(72vw, 300px);
  height: auto;
}

.code {
  margin: 10px 0 0;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--muted);
  word-break: break-all;
}

.hint {
  margin: 0;
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--ink);
}
</style>
