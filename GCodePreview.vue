<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { GCodePreview } from 'gcode-preview';

export default {
  props: {
    src: String,
    topLayerColor: String,
    lastSegmentColor: String,
    endLayer: Number,
    startLayer: Number,
    lineWidth: Number
  },

  data() {
    return {
      layerCount: 0
    };
  },

  async mounted() {
    this.preview = new GCodePreview({
      droppable: true,
      renderTubes: true,
      canvas: this.$refs.canvas,
      endLayer: this.endLayer,
      startLayer: this.startLayer,
      topLayerColor: this.topLayerColor,
      lastSegmentColor: this.lastSegmentColor,
      lineWidth: this.lineWidth,
      buildVolume: { x: 250, y: 220, z: 150 },
      initialCameraPosition: [0, 400, 450],
      extrusionColor: 'cyan',
      extrusionWidth: 1.1
    });

    window.addEventListener('resize', this.handleResize);

    await this.loadGCode(this.src);
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    this.preview?.dispose();
    this.preview = null;
  },

  methods: {
    handleResize() {
      this.preview?.sceneManager.resize();
    },

    // The library reads, parses and draws the stream incrementally on its own,
    // so there is no need to hand-roll a chunked setTimeout loop anymore.
    async loadGCode(url) {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`status code: ${response.status}`);
      }

      // clear() also cancels any stream still in flight
      this.preview.clear();
      await this.preview.processGCodeStream(response.body);

      this.layerCount = this.preview.countLayers;
    },

    getModel() {
      return this.preview.sceneManager.scene;
    }
  }
};
</script>
<style scoped>
canvas {
  outline: none;
  width: 100%;
  height: 100%;
}
</style>
