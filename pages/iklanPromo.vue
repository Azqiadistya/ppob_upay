<template>
  <div ml-10 class="tabelPromo">
    <v-data-table
      :headers="headers"
      :items="desserts"
      sort-by="tipe"
      class="elevation-1"
      light
    >
      <template #top>
        <v-toolbar flat>
          <v-toolbar-title><strong>Iklan Promo</strong> </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template #activator="{ on, attrs }">
              <v-btn
                id="btnAddPromo"
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                Tambah Promo
              </v-btn>
            </template>
            <v-card light>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-col>
                <v-file-input
                  id="inputImage"
                  v-model="image"
                  type="file"
                  class="input"
                  label="Upload license"
                  hint="Add a picture of youre license"
                  outlined
                  dense
                  @change="onFileChange"
                />
              </v-col>
              <v-col>
                <h4>Preview</h4>
                <v-img
                  :src="imageUrl"
                  style="border: 1px dashed #ccc; min-height: 250px"
                />
              </v-col>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"> Batal </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Simpan </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card light>
              <v-card-title id="konfirmDelete" class="text-h6"
                >Apakah anda yakin ingin menghapus Promo ini?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  id="btnCloseDelete"
                  color="blue darken-1"
                  text
                  @click="closeDelete"
                  >Tidak</v-btn
                >
                <v-btn
                  id="btnDelete"
                  color="blue darken-1"
                  text
                  @click="deleteItemConfirm"
                  >Ya</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template #[`item.actions`]="{ item }">
        <!-- <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon> -->
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template #[`item.pictures`]>
        <img src="../assets/img/promo1.png" alt="" width="300" />
      </template>
      <template #no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  data: () => ({
    image: undefined,
    // to save image url
    imageUrl: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Picture',
        align: 'start',
        sortable: false,
        value: 'pictures',
      },
      { text: 'Nama', value: 'name' },
      { text: 'Tipe', value: 'tipe' },
      { text: 'Lokasi', value: 'lokasi' },
      { text: 'Aksi', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      tipe: 0,
      lokasi: 0,
    },
    defaultItem: {
      name: '',
      tipe: 0,
      lokasi: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Promo' : 'Edit Promo'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  mounted() {
    if (Cookies.get('t')) {
      this.$router.push('/iklanPromo')
    } else {
      this.$router.push('/login')
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.desserts = [
        {
          name: 'promo1',
          tipe: 'image/png',
          lokasi: 'public/uploads/promo1.png',
        },
        {
          name: 'promo2',
          tipe: 'image/jpg',
          lokasi: 'public/uploads/promo2.png',
        },
        {
          name: 'promo3',
          tipe: 'image/png',
          lokasi: 'public/uploads/promo3.png',
        },
      ]
    },

    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    },
    createImage(file) {
      const reader = new FileReader()

      reader.onload = (e) => {
        this.imageUrl = e.target.result
      }
      reader.readAsDataURL(file)
    },
    onFileChange(file) {
      if (!file) {
        return
      }
      this.createImage(file)
    },
  },
}
</script>
<style>
.tabelPromo {
  margin-left: 45px;
  margin-right: 45px;
  margin-bottom: 45px;
}
</style>
