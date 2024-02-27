# Transfer Nightscout data to LibreView

Transfer your diabetes data from Nightscout to LibreView.

The project was inspired by the following projects:

- <https://github.com/creepymonster/nightscout-to-libreview>
- <https://github.com/blutz1982/go-nsexporter-libreview>

## Usage

```bash
Usage: ns-to-libre [options] [command]

Options:
  -V, --version        output the version number
  -h, --help           display help for command

Commands:
  convert|c [options]  convert and transfer Nightscout data to LibreView
  generate|g           generate default config file
  help [command]       display help for command
```

### convert

Convert and transfer Nightscout data to LibreView.

```bash
Usage: ns-to-libre convert|c [options]

Options:
  -c, --config <path>  path to config file (default: "config.yaml")
  --dry-run            do not send data to LibreView
  -h, --help           display help for command
```

### generate

Generate default "config.yaml" file.

```bash
Usage: ns-to-libre generate|g [options]

Options:
  -h, --help  display help for command
```

## Example

```bash
# Transfer Nightscout data to LibreView with config file "test-config.yaml"
ns-to-libre convert --config test-config.yaml

# Transfer Nightscout data to LibreView with default config file "config.yaml"
ns-to-libre

# Generate default config file "config.yaml"
ns-to-libre generate
```
