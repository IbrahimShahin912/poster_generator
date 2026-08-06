# Fonts

Place downloaded `.ttf`, `.otf`, `.woff`, or `.woff2` font files in this folder.

For automatic Faruma support, name the font file `Faruma.ttf` or
`Faruma.woff2`. The website also uses a locally installed Faruma font when
available.

The poster generator can still load a font from the Typography panel without uploading it anywhere. To bundle a font permanently, add an `@font-face` rule to `../style.css` that points to the font file in this directory.
