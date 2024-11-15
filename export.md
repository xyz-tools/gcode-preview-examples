---
hello: world
---

<script setup>
import { ref, onMounted } from 'vue';
import { STLExporter } from 'three/addons/exporters/STLExporter.js';

  const preview = ref();
let link;

onMounted(() => {
  console.log('onmounted')

link= document.createElement( 'a' );
      link.style.display = 'none';
      document.body.appendChild( link );
});

function handleExport(e) {
  console.log('exporting...');

  // Instantiate an exporter
  const exporter = new STLExporter();

  // Configure export options
  const options = { binary: true }

  // Parse the input and generate the STL encoded output
  const mesh =  preview.value.getModel();
  console.log(mesh)
  const result = exporter.parse(mesh, options );

  const file = 'model.stl';
  if (options.binary) {
    saveArrayBuffer(result, file )
  }
  else {
    saveString(result, file)
  }
}

function save( blob, filename ) {
  link.href = URL.createObjectURL( blob );
  link.download = filename;
  link.click();
}

function saveString( text, filename ) {
  save( new Blob( [ text ], { type: 'text/plain' } ), filename );
}

function saveArrayBuffer( buffer, filename ) {
  save( new Blob( [ buffer ], { type: 'application/octet-stream' } ), filename );
}
</script>

# Exporting

```
<GCodePreview src="benchy.gcode" />
```

<GCodePreview ref="preview" src="benchy.gcode" />

<button @click.prevent="handleExport">Export</button>
<style module>
</style>
